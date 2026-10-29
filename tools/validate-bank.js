/*
 * Checks the question bank against the schema and prints the answer key so it
 * can be compared with the reference PDF.
 *
 *   node tools/validate-bank.js
 *
 * Exits with code 1 when a problem is found.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const bankFiles = Array.from(html.matchAll(/<script src="(assets\/js\/bank\/[^"]+)"><\/script>/g)).map((m) => m[1]);
if (!bankFiles.length) { console.error("No bank scripts are listed in index.html."); process.exit(1); }

const ctx = { window: {} };
vm.createContext(ctx);
bankFiles.forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), ctx, { filename: file }));
const D = ctx.window.EXAM;
if (!D || !Array.isArray(D.questions)) { console.error("window.EXAM.questions is missing. Check assets/js/bank/meta.js."); process.exit(1); }

const errors = [];
const warn = [];
const E = (q, message) => errors.push((q.id || "?") + ": " + message);
const TYPES = ["single", "multi", "yesno", "dropdown", "order", "dragdrop", "simulation"];
const placeholders = (template) => Array.from(template.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1]);

if (!D.exam || !D.exam.code || /XX-000/.test(D.exam.code)) errors.push("meta.js: exam.code is not set.");
if (!D.exam || !D.exam.title || /as printed/.test(D.exam.title)) errors.push("meta.js: exam.title is not set.");
if (!D.domains || !Object.keys(D.domains).length) errors.push("meta.js: domains is empty.");

function checkBlocks(q, blocks, where) {
  if (!Array.isArray(blocks) || !blocks.length) return E(q, where + " has no content");
  blocks.forEach((b) => {
    if (typeof b === "string") return;
    if (b.code !== undefined || b.list || b.note || b.heading) return;
    if (b.table) { b.table.rows.forEach((r) => { if (r.length !== b.table.head.length) E(q, where + ": table row width differs from the header"); }); return; }
    if (b.image) { if (!fs.existsSync(path.join(root, "assets", "exhibits", b.image))) E(q, where + ": missing image assets/exhibits/" + b.image); if (!b.alt) E(q, where + ": image has no alt text"); return; }
    E(q, where + ": unknown block " + JSON.stringify(b).slice(0, 60));
  });
}

const ids = new Set();
const sources = new Set();
const counts = { type: {}, domain: {}, topic: {} };

D.questions.forEach((q, index) => {
  if (!q.id) return errors.push("Question at position " + (index + 1) + " has no id.");
  if (ids.has(q.id)) E(q, "duplicate id"); ids.add(q.id);
  if (sources.has(q.source)) E(q, "duplicate source number " + q.source); sources.add(q.source);
  if (index > 0 && D.questions[index - 1].source >= q.source) E(q, "questions are not in source order");
  if (!TYPES.includes(q.type)) return E(q, "unknown type " + q.type);
  if (!D.domains[q.domain]) E(q, "domain '" + q.domain + "' is not defined in meta.js");
  if (!q.topic) E(q, "no topic");
  if (!["Basic", "Intermediate", "Advanced"].includes(q.difficulty)) E(q, "difficulty must be Basic, Intermediate or Advanced");
  checkBlocks(q, q.stem, "stem");
  ["type", "domain", "topic"].forEach((k) => { counts[k][q[k]] = (counts[k][q[k]] || 0) + 1; });

  const key = q.answer;
  if (key === undefined || key === null) return E(q, "no answer");
  if (q.type === "single" || q.type === "multi") {
    if (!Array.isArray(q.options) || q.options.length < 2) return E(q, "needs at least two options");
    q.options.forEach((o) => { if (!o.key || (!o.text && !o.code)) E(q, "option without key or content"); });
    if (!Array.isArray(key) || !key.length) return E(q, "answer must be an array of option keys");
    key.forEach((k) => { if (!q.options.find((o) => o.key === k)) E(q, "answer key " + k + " is not an option"); });
    if (q.type === "single" && key.length !== 1) E(q, "single choice must have exactly one answer");
    if (q.type === "multi" && q.select !== key.length) E(q, "select (" + q.select + ") differs from the number of answers (" + key.length + ")");
  } else if (q.type === "yesno") {
    if (!Array.isArray(q.statements) || !q.statements.length) return E(q, "no statements");
    if (!Array.isArray(key) || key.length !== q.statements.length || key.some((v) => typeof v !== "boolean")) E(q, "answer must be one true/false per statement");
  } else if (q.type === "dropdown") {
    if (!Array.isArray(q.fields) || !q.fields.length) return E(q, "no fields");
    q.fields.forEach((f) => { if (!(key[f.id] >= 0 && key[f.id] < f.options.length)) E(q, "answer for field " + f.id + " is out of range"); if (!f.label) E(q, "field " + f.id + " has no label"); });
    if (q.template) { const used = placeholders(q.template); q.fields.forEach((f) => { if (!used.includes(f.id)) E(q, "template has no {{" + f.id + "}}"); }); used.forEach((id) => { if (!q.fields.find((f) => f.id === id)) E(q, "template placeholder {{" + id + "}} has no field"); }); }
  } else if (q.type === "order") {
    if (!Array.isArray(q.items) || q.items.length < 2) return E(q, "no items");
    if (!Array.isArray(key) || !key.length) return E(q, "answer must be an array of item indexes");
    key.forEach((i) => { if (!(i >= 0 && i < q.items.length)) E(q, "answer index " + i + " is out of range"); });
    if (new Set(key).size !== key.length) E(q, "answer repeats an item");
  } else if (q.type === "dragdrop") {
    if (!Array.isArray(q.sources) || !Array.isArray(q.targets) || !q.targets.length) return E(q, "needs sources and targets");
    q.targets.forEach((t) => { if (!(key[t.id] >= 0 && key[t.id] < q.sources.length)) E(q, "answer for target " + t.id + " is out of range"); if (!t.label) E(q, "target " + t.id + " has no label"); });
    if (q.template) { const used = placeholders(q.template); q.targets.forEach((t) => { if (!used.includes(t.id)) E(q, "template has no {{" + t.id + "}}"); }); }
  } else if (q.type === "simulation") {
    if (!Array.isArray(key) || key.length !== 1 || key[0] !== "can") E(q, "a simulation's answer must be [\"can\"]");
    checkBlocks(q, q.solution, "solution");
  }

  const ex = q.explanation;
  if (!ex) return E(q, "no explanation");
  if (!Array.isArray(ex.correct) || !ex.correct.length) E(q, "explanation.correct is empty");
  if (!ex.concept) E(q, "explanation.concept is empty");
  if (!ex.takeaway) E(q, "explanation.takeaway is empty");
  if (q.type !== "simulation" && (!Array.isArray(ex.wrong) || !ex.wrong.length)) E(q, "explanation.wrong is empty");
  if (ex.keyNote) E(q, "keyNote is not supported: the answers are the PDF's, with no notes");
  (ex.refs || []).forEach((r) => { if (!Array.isArray(r) || !/^https:\/\//.test(r[1] || "")) E(q, "reference must be [label, https url]"); });
  if (!ex.refs || !ex.refs.length) warn.push(q.id + ": no reference link");
  if ((q.type === "single" || q.type === "multi") && Array.isArray(ex.wrong)) {
    const covered = new Set(ex.wrong.map((w) => w[0]));
    ex.wrong.forEach((w) => { if (!q.options.find((o) => o.key === w[0])) E(q, "explanation.wrong label '" + w[0] + "' is not an option key"); if (key.includes(w[0])) E(q, "explanation.wrong gives a reason against the answer " + w[0]); });
    q.options.forEach((o) => { if (!key.includes(o.key) && !covered.has(o.key)) E(q, "no reason given for option " + o.key); });
  }

  if (q.caseId) {
    if (!D.cases || !D.cases[q.caseId]) E(q, "caseId '" + q.caseId + "' is not defined in meta.js");
    if (typeof q.caseOrder !== "number") E(q, "question in a scenario set needs caseOrder");
  }
});

Object.keys(D.cases || {}).forEach((id) => {
  const c = D.cases[id];
  const members = D.questions.filter((q) => q.caseId === id).sort((a, b) => a.caseOrder - b.caseOrder);
  if (!members.length) errors.push("case " + id + ": no questions use it");
  members.forEach((q, i) => { if (q.caseOrder !== i + 1) errors.push("case " + id + ": caseOrder must run 1.." + members.length + " without gaps"); });
  if (!c.title || !c.shortTitle) errors.push("case " + id + ": needs title and shortTitle");
  if (!Array.isArray(c.sections) || !c.sections.length) errors.push("case " + id + ": needs sections");
  (c.sections || []).forEach((s) => { if (!s.id || !s.title) errors.push("case " + id + ": section needs id and title"); checkBlocks({ id: "case " + id }, s.blocks, "section " + s.id); });
});

function printable(q) {
  const key = q.answer;
  if (q.type === "single" || q.type === "multi") return key.slice().sort().join("");
  if (q.type === "yesno") return key.map((v) => (v ? "Y" : "N")).join("");
  if (q.type === "dropdown") return q.fields.map((f) => f.options[key[f.id]]).join(" | ");
  if (q.type === "order") return key.map((i, n) => (n + 1) + ". " + String(q.items[i]).slice(0, 40)).join(" | ");
  if (q.type === "simulation") return "(lab task, self-assessed)";
  return q.targets.map((t) => q.sources[key[t.id]]).join(" | ");
}

console.log("Exam: " + (D.exam ? D.exam.code + " — " + D.exam.title : "(not set)"));
console.log("Questions: " + D.questions.length);
console.log("By type: " + JSON.stringify(counts.type));
console.log("By skill area: " + JSON.stringify(counts.domain));
console.log("By topic: " + JSON.stringify(counts.topic));
console.log("Scenario sets: " + JSON.stringify(Object.keys(D.cases || {}).map((id) => id + " (" + D.questions.filter((q) => q.caseId === id).length + ")")));
console.log("\nAnswer key — compare every line with the PDF:");
D.questions.forEach((q) => console.log("  " + String(q.source).padStart(3) + "  " + q.type.padEnd(8) + "  " + printable(q)));
if (warn.length) console.log("\nWarnings:\n  " + warn.join("\n  "));
if (errors.length) { console.log("\nERRORS (" + errors.length + "):\n  " + errors.join("\n  ")); process.exit(1); }
console.log("\nNo errors.");
