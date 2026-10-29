/*
 * Drives the reviewer in a real browser and checks that it works with the
 * current question bank, at desktop, tablet and phone sizes.
 *
 *   npm install --prefix tools/.test-deps puppeteer-core axe-core
 *   node tools/smoke-test.js
 *
 * Needs Chrome or Edge. Set CHROME_PATH if it is not found automatically.
 * Screenshots are written to tools/.test-deps/shots. Exits with code 1 on failure.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const deps = path.join(__dirname, ".test-deps", "node_modules");
let puppeteer;
try { puppeteer = require(path.join(deps, "puppeteer-core")); }
catch (e) { console.error("puppeteer-core is not installed. Run: npm install --prefix tools/.test-deps puppeteer-core axe-core"); process.exit(1); }
let axeSource = null;
try { axeSource = fs.readFileSync(path.join(deps, "axe-core", "axe.min.js"), "utf8"); } catch (e) { /* audit is skipped */ }

const browserPath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium", "/usr/bin/microsoft-edge"
].filter(Boolean).find((p) => fs.existsSync(p));
if (!browserPath) { console.error("Chrome or Edge was not found. Set CHROME_PATH to the browser executable."); process.exit(1); }

const URL = "file:///" + path.join(root, "index.html").replace(/\\/g, "/").split("/").map(encodeURIComponent).join("/").replace(/%3A/g, ":");
const shots = path.join(__dirname, ".test-deps", "shots");
fs.mkdirSync(shots, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1366, height: 800 },
  tablet: { width: 820, height: 1180, isMobile: true, hasTouch: true },
  phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
};

const failures = [];
const fail = (message) => { failures.push(message); console.log("  FAIL " + message); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- helpers that run inside the page ---------- */

// Elements that stick out of the viewport and are not inside a horizontal scroller.
const findOverflow = () => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  if (document.documentElement.scrollWidth > vw + 1) out.push("document is wider than the viewport");
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || r.right <= vw + 1) return;
    let p = el.parentElement;
    while (p) { if (/(auto|scroll)/.test(getComputedStyle(p).overflowX)) return; p = p.parentElement; }
    out.push(String(el.className || el.tagName).slice(0, 40));
  });
  return out.slice(0, 5);
};

const currentQuestion = () => {
  const s = App.engine.loadSession();
  const q = App.engine.byId.get(s.order[s.index]);
  return { id: q.id, type: q.type, template: !!q.template, caseId: q.caseId || null, index: s.index, source: q.source };
};

// Answers the current question through the interface. useKey=true enters the answer key.
const answerCurrent = (useKey) => {
  const E = App.engine;
  const s = E.loadSession();
  const q = E.byId.get(s.order[s.index]);
  const key = E.keyOf(q);
  const main = document.querySelector(".exam-main");
  const slotOrder = (list) => (q.template ? Array.from(q.template.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1]) : list.map((x) => x.id));
  if (q.type === "single" || q.type === "multi") {
    const inputs = Array.from(main.querySelectorAll(".choice input"));
    const want = useKey ? key : q.options.slice(0, key.length).map((o) => o.key);
    inputs.forEach((i) => { if (want.includes(i.value)) i.click(); });
  } else if (q.type === "yesno") {
    main.querySelectorAll(".yn__row").forEach((row, i) => row.querySelectorAll("input")[useKey ? (key[i] ? 0 : 1) : 0].click());
  } else if (q.type === "dropdown") {
    const selects = main.querySelectorAll("select.select");
    slotOrder(q.fields).forEach((id, i) => { selects[i].value = String(useKey ? key[id] : 0); selects[i].dispatchEvent(new Event("change", { bubbles: true })); });
  } else if (q.type === "order") {
    (useKey ? key : q.items.map((x, i) => i).slice(0, key.length)).forEach((item) => {
      const el = main.querySelector('.dnd-item[data-item="' + item + '"]');
      el.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    });
  } else if (q.type === "simulation") {
    main.querySelector('.choices--sim input[value="' + (useKey ? "can" : "cannot") + '"]').click();
  } else if (q.type === "dragdrop") {
    slotOrder(q.targets).forEach((id, i) => {
      main.querySelector('.dnd-list--bank .dnd-item[data-source="' + (useKey ? key[id] : 0) + '"]').click();
      main.querySelectorAll(".slot__target")[i].click();
    });
  }
};

/* ---------- helpers that run in Node ---------- */

async function clickButton(page, scope, text) {
  const ok = await page.evaluate((scope, text) => {
    const el = Array.from(document.querySelectorAll(scope + " button, " + scope + " a")).find((e) => e.textContent.trim().startsWith(text) && !e.disabled);
    if (!el) return false; el.click(); return true;
  }, scope, text);
  if (!ok) throw new Error("Button not found: " + text);
}

async function advance(page) {
  const label = await page.evaluate(() => Array.from(document.querySelectorAll(".exam-foot button")).map((b) => b.textContent.trim()).find((t) => t.startsWith("Next") || t.startsWith("Review screen") && !t.includes("Return")));
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll(".exam-foot .exam-foot__group:last-child button")).pop(); b.click(); });
  await sleep(40);
  if (await page.$("dialog.dialog[open]")) { await clickButton(page, "dialog.dialog", "Continue"); await sleep(40); }
  return label;
}

async function startSession(page, prefs) {
  await page.goto(URL); await sleep(150);
  await page.evaluate((prefs) => { localStorage.clear(); App.store.set("prefs", prefs); }, prefs);
  await page.reload(); await sleep(200);
  await clickButton(page, ".setup", "Start"); await sleep(150);
  await clickButton(page, ".exam-foot", "Begin"); await sleep(150);
}

async function audit(page, label) {
  if (!axeSource) return;
  await page.evaluate(axeSource);
  const found = await page.evaluate(async () => {
    const r = await axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] });
    return r.violations.map((v) => v.id + " (" + v.nodes.length + ") " + v.nodes[0].target.join(" "));
  });
  found.forEach((v) => fail("accessibility, " + label + ": " + v));
}

async function pointerDrag(page, from, to, touch) {
  if (!touch) {
    await page.mouse.move(from.x, from.y); await page.mouse.down();
    await page.mouse.move(from.x + 10, from.y + 10, { steps: 3 });
    await page.mouse.move(to.x, to.y, { steps: 8 }); await sleep(30); await page.mouse.up();
  } else {
    const client = await page.target().createCDPSession();
    const pt = (x, y) => [{ x, y, id: 1 }];
    await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: pt(from.x, from.y) });
    for (let i = 1; i <= 8; i += 1) { await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: pt(from.x + ((to.x - from.x) * i) / 8, from.y + ((to.y - from.y) * i) / 8) }); await sleep(15); }
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  }
  await sleep(150);
}

const centerOf = (page, selector, index) => page.evaluate((selector, index) => {
  const el = document.querySelectorAll(selector)[index || 0];
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}, selector, index);

/* ---------- the run ---------- */

(async () => {
  const browser = await puppeteer.launch({ executablePath: browserPath, headless: "new", args: ["--allow-file-access-from-files"] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push(e.message));
  await page.setViewport(VIEWPORTS.desktop);
  await page.goto(URL); await sleep(200);

  const info = await page.evaluate(() => ({
    code: EXAM.exam.code, total: EXAM.questions.length,
    types: Array.from(new Set(EXAM.questions.map((q) => q.type + (q.template ? "+template" : "")))),
    firstOfType: EXAM.questions.reduce((acc, q, i) => { const k = q.type + (q.template ? "+template" : "") + (q.caseId ? "+case" : ""); if (!(k in acc)) acc[k] = q.id; return acc; }, {}),
    images: EXAM.questions.filter((q) => q.stem.some((b) => b && b.image)).map((q) => q.id)
  }));
  console.log(info.code + ": " + info.total + " questions, types: " + info.types.join(", "));
  if (!info.total) { console.error("The bank is empty."); process.exit(1); }

  /* 1. Engine: session sizes, scenario sets kept whole, the key grades as correct */
  console.log("\n1. Session building and grading");
  const engine = await page.evaluate(() => {
    const E = App.engine; const out = [];
    const total = EXAM.questions.length;
    [10, 30, 50, 100, "all"].forEach((count) => {
      for (let t = 0; t < 100; t += 1) {
        const s = E.createSession({ mode: "exam", count, pool: "all", shuffle: true, timed: true, noReturn: true });
        const want = count === "all" ? total : Math.min(count, total);
        if (s.order.length !== want) { out.push("size " + count + " gave " + s.order.length + ", expected " + want); break; }
        if (new Set(s.order).size !== s.order.length) { out.push("size " + count + " repeats a question"); break; }
        const seen = {};
        s.order.forEach((id, i) => { const c = E.byId.get(id).caseId; if (c) (seen[c] = seen[c] || []).push(i); });
        const broken = Object.keys(seen).some((c) => {
          const idx = seen[c]; const all = EXAM.questions.filter((q) => q.caseId === c).length;
          return idx.length !== all || idx.some((v, k) => k > 0 && v !== idx[k - 1] + 1) || idx.some((v, k) => E.byId.get(s.order[v]).caseOrder !== k + 1);
        });
        if (broken) { out.push("size " + count + " split or reordered a scenario set"); break; }
      }
    });
    EXAM.questions.forEach((q) => {
      if (E.grade(q, JSON.parse(JSON.stringify(E.keyOf(q)))).status !== "correct") out.push(q.id + ": the answer key does not grade as correct");
      if (E.grade(q, undefined).status !== "unanswered") out.push(q.id + ": an empty answer does not grade as unanswered");
    });
    return out;
  });
  engine.forEach(fail);
  if (!engine.length) console.log("  ok");

  /* 2. Exam mode, every question, answered with the key through the interface */
  for (const name of ["desktop", "phone", "tablet"]) {
    console.log("\n2. Exam mode, all questions, " + name);
    await page.setViewport(VIEWPORTS[name]);
    await startSession(page, { mode: "exam", count: "all", pool: "all", shuffle: false, timed: true, noReturn: true });
    const shot = {};
    for (let i = 0; i < info.total; i += 1) {
      const q = await page.evaluate(currentQuestion);
      if (q.index !== i) { fail(name + ": expected position " + i + ", at " + q.index); break; }
      const over = await page.evaluate(findOverflow);
      if (over.length) fail(name + " " + q.id + " overflows: " + over.join(", "));
      if (await page.evaluate(() => !!document.querySelector(".result, .fb, .is-correct, .is-wrong, .badge, .fix-chip"))) fail(name + " " + q.id + ": exam mode reveals correctness");
      const kind = q.type + (q.template ? "-template" : "") + (q.caseId ? "-case" : "");
      if (!shot[kind] || info.images.includes(q.id)) { shot[kind] = true; await page.screenshot({ path: path.join(shots, name + "-" + q.id + "-" + kind + ".png") }); }
      await page.evaluate(answerCurrent, name === "desktop");
      await advance(page);
    }
    await sleep(150);
    const over = await page.evaluate(findOverflow);
    if (over.length) fail(name + " review screen overflows: " + over.join(", "));
    await page.screenshot({ path: path.join(shots, name + "-review-screen.png") });
    await clickButton(page, ".exam-foot", "Submit exam"); await sleep(100);
    await clickButton(page, "dialog.dialog", "Submit exam"); await sleep(300);
    const attempt = await page.evaluate(() => App.engine.loadAttempts().slice(-1)[0]);
    if (!attempt || attempt.status !== "Completed") { fail(name + ": the exam was not recorded as completed"); continue; }
    console.log("  score " + attempt.correct + " / " + attempt.size + ", points " + attempt.points + " / " + attempt.maxPoints);
    if (name === "desktop" && attempt.correct !== attempt.size) {
      fail("answering with the key through the interface should score 100%. Not correct: " + attempt.order.filter((id) => attempt.results[id].status !== "correct").join(", "));
    }
    const resultsOver = await page.evaluate(findOverflow);
    if (resultsOver.length) fail(name + " results overflow: " + resultsOver.join(", "));
    await page.screenshot({ path: path.join(shots, name + "-results.png"), fullPage: true });
    if (name !== "tablet") await audit(page, "results " + name);

    // answer review: step through every question
    await page.evaluate((id) => { location.hash = "#/review/" + id + "/all"; }, attempt.id); await sleep(250);
    for (let i = 0; i < info.total; i += 1) {
      const state = await page.evaluate(() => ({ result: !!document.querySelector(".result"), fb: !!document.querySelector(".fb"), locked: Array.from(document.querySelectorAll(".exam-main input, .exam-main select")).every((e) => e.disabled) }));
      if (!state.result || !state.fb || !state.locked) { fail(name + ": answer review of question " + (i + 1) + " is missing the verdict, the explanation or is editable"); break; }
      const o = await page.evaluate(findOverflow);
      if (o.length) fail(name + " answer review, question " + (i + 1) + " overflows: " + o.join(", "));
      if (i < info.total - 1) { await page.evaluate(() => Array.from(document.querySelectorAll(".exam-foot button")).find((b) => b.textContent.trim().startsWith("Next")).click()); await sleep(40); }
    }
    await page.evaluate(() => { location.hash = "#/history"; }); await sleep(300);
    const historyOver = await page.evaluate(findOverflow);
    if (historyOver.length) fail(name + " history overflows: " + historyOver.join(", "));
    await page.screenshot({ path: path.join(shots, name + "-history.png"), fullPage: true });
    if (name !== "tablet") await audit(page, "history " + name);
  }

  /* 3. Reviewer mode: one question of each kind, checked, at desktop and phone */
  for (const name of ["desktop", "phone"]) {
    console.log("\n3. Reviewer mode, one of each kind, " + name);
    await page.setViewport(VIEWPORTS[name]);
    await page.goto(URL); await sleep(150);
    await page.evaluate((ids) => {
      localStorage.clear();
      const s = App.engine.createSession({ mode: "review", count: "all", pool: "all", shuffle: false }, ids);
      s.begun = true; s.startedAt = Date.now(); App.engine.saveSession(s); location.hash = "#/exam";
    }, Object.values(info.firstOfType));
    await sleep(300);
    await audit(page, "question " + name);
    const kinds = Object.keys(info.firstOfType);
    for (let i = 0; i < kinds.length; i += 1) {
      await page.evaluate(answerCurrent, false);
      await clickButton(page, ".exam-foot", (await page.evaluate(() => Array.from(document.querySelectorAll(".exam-foot button")).some((b) => b.textContent.trim().startsWith("Check answer")))) ? "Check answer" : "Show answer");
      await sleep(200);
      const seen = await page.evaluate(() => {
        const r = document.querySelector(".result"); const m = document.querySelector(".exam-main");
        if (!r || !m) return null;
        const a = r.getBoundingClientRect(); const b = m.getBoundingClientRect();
        return { visible: a.top >= b.top - 1 && a.bottom <= b.bottom + 1, explanation: !!document.querySelector(".fb") };
      });
      if (!seen || !seen.visible || !seen.explanation) fail(name + " " + kinds[i] + ": the verdict is not on screen after Check answer, or the explanation is missing");
      const over = await page.evaluate(findOverflow);
      if (over.length) fail(name + " " + kinds[i] + " revealed overflows: " + over.join(", "));
      await page.screenshot({ path: path.join(shots, name + "-revealed-" + kinds[i].replace(/\+/g, "-") + ".png") });
      await audit(page, kinds[i] + " revealed " + name);
      if (i < kinds.length - 1) await advance(page);
    }
  }

  /* 4. Real pointer drag and drop, mouse and touch */
  const dragKinds = Object.keys(info.firstOfType).filter((k) => /^(order|dragdrop)/.test(k) && !/case/.test(k));
  for (const name of dragKinds.length ? ["desktop", "phone"] : []) {
    console.log("\n4. Drag and drop with a real pointer, " + name);
    const touch = name === "phone";
    await page.setViewport(VIEWPORTS[name]);
    for (const kind of dragKinds) {
      await page.goto(URL); await sleep(150);
      await page.evaluate((id) => {
        localStorage.clear();
        const s = App.engine.createSession({ mode: "review", count: "all", pool: "all", shuffle: false }, [id]);
        s.begun = true; s.startedAt = Date.now(); App.engine.saveSession(s); location.hash = "#/exam";
      }, info.firstOfType[kind]);
      await sleep(300);
      // An answer area taller than the pane is aligned to its source list, so the drag source stays on screen.
      await page.evaluate((order) => {
        const area = document.querySelector(".answer-area");
        if (area.offsetHeight <= document.querySelector(".exam-main").clientHeight) return area.scrollIntoView({ block: "center" });
        (document.querySelector(order ? ".order__col" : ".dnd-list--bank") || area).scrollIntoView({ block: "start" });
      }, kind.startsWith("order")); await sleep(60);
      const isOrder = kind.startsWith("order");
      const from = await centerOf(page, (isOrder ? ".order__col:nth-child(1) " : ".dnd-list--bank ") + (touch ? ".dnd-item__grip" : ".dnd-item"), 0);
      const to = await centerOf(page, isOrder ? ".dnd-list--answer" : ".slot", 0);
      await pointerDrag(page, from, to, touch);
      const placed = await page.evaluate((id) => { const a = App.engine.loadSession().answers[id]; return a ? (Array.isArray(a) ? a.length : Object.keys(a).length) : 0; }, info.firstOfType[kind]);
      if (placed !== 1) fail(name + " " + kind + ": dragging an item did not place it");
      else console.log("  " + kind + " ok");
    }
  }

  /* 5. Resume after reload, and automatic submission when time runs out */
  console.log("\n5. Resume and timer");
  await page.setViewport(VIEWPORTS.desktop);
  await startSession(page, { mode: "exam", count: Math.min(10, info.total), pool: "all", shuffle: true, timed: true, noReturn: false });
  await page.evaluate(answerCurrent, true);
  if (info.total > 1) await advance(page);
  await page.reload(); await sleep(300);
  const resumed = await page.evaluate(() => ({ hash: location.hash, answered: Object.keys(App.engine.loadSession().answers).length, index: App.engine.loadSession().index }));
  if (resumed.hash !== "#/exam" || resumed.answered !== 1 || resumed.index !== (info.total > 1 ? 1 : 0)) fail("the session did not resume where it was left after a reload");
  await page.evaluate(() => { const s = App.engine.loadSession(); s.elapsedSec = s.timeLimitSec - 2; App.engine.saveSession(s); });
  await page.reload(); await sleep(3600);
  const expired = await page.evaluate(() => { const d = document.querySelector("dialog.dialog[open] .dialog__title"); return d ? d.textContent : null; });
  if (expired !== "Time has expired") fail("the exam was not submitted when time ran out");
  else { const last = await page.evaluate(() => App.engine.loadAttempts().slice(-1)[0].status); if (last !== "Timed out") fail("the timed-out exam was not recorded as Timed out"); else console.log("  ok"); }

  /* 6. Dashboard */
  await page.goto(URL); await sleep(200);
  await audit(page, "dashboard desktop");
  await page.setViewport(VIEWPORTS.phone); await page.reload(); await sleep(200);
  await audit(page, "dashboard phone");
  const dashOver = await page.evaluate(findOverflow);
  if (dashOver.length) fail("dashboard overflows on phone: " + dashOver.join(", "));
  await page.screenshot({ path: path.join(shots, "phone-dashboard.png"), fullPage: true });

  consoleErrors.forEach((e) => fail("browser error: " + e));
  await browser.close();
  console.log("\n" + (axeSource ? "" : "Accessibility audit skipped: axe-core is not installed.\n") + (failures.length ? failures.length + " FAILURE(S)" : "ALL CHECKS PASSED") + ". Screenshots: " + path.relative(root, shots));
  process.exit(failures.length ? 1 : 0);
})().catch((e) => { console.error("TEST RUN FAILED:", e); process.exit(1); });
