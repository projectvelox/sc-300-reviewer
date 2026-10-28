/*
 * Bundles the reviewer into one self-contained HTML file (styles, scripts and
 * exhibit images inlined) so it can be copied to a phone or shared as a single
 * attachment.
 *
 *   node tools/build-single-file.js
 *
 * Output: dist/<exam code>-reviewer.html
 * The source of truth stays in index.html and assets/. Rebuild after any change.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

let html = read("index.html");

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (match, href) => "<style>\n" + read(href) + "\n</style>");

// Exhibit images become data URIs that the widgets look up by file name.
const exhibitDir = path.join(root, "assets", "exhibits");
const exhibits = {};
if (fs.existsSync(exhibitDir)) {
  fs.readdirSync(exhibitDir).filter((f) => /\.(png|jpe?g|gif|svg)$/i.test(f)).forEach((file) => {
    const ext = path.extname(file).slice(1).toLowerCase();
    const mime = ext === "svg" ? "image/svg+xml" : ext === "jpg" ? "image/jpeg" : "image/" + ext;
    exhibits[file] = "data:" + mime + ";base64," + fs.readFileSync(path.join(exhibitDir, file)).toString("base64");
  });
}

let first = true;
html = html.replace(/<script src="([^"]+)"><\/script>/g, (match, src) => {
  const code = read(src).replace(/<\/script/gi, "<\\/script");
  const prefix = first ? "<script>window.EXAM_EXHIBITS = " + JSON.stringify(exhibits) + ";</script>\n  " : "";
  first = false;
  return prefix + "<script>\n" + code + "\n</script>";
});

const examCode = (/code:\s*"([^"]+)"/.exec(read("assets/js/bank/meta.js")) || [])[1] || "exam";
const slug = examCode.toLowerCase().replace(/[^a-z0-9]+/g, "") || "exam";

const outDir = path.join(root, "dist");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, slug + "-reviewer.html");
fs.writeFileSync(outFile, html);
console.log("Wrote " + path.relative(root, outFile) + " (" + Math.round(fs.statSync(outFile).size / 1024) + " KB)");
