"""
Pulls everything needed to transcribe an exam PDF into a working folder.

    python tools/extract-pdf.py "<exam.pdf>" "<work folder>"

Writes:
    text.txt        the text layer, page by page
    pages/pNNN.png  every page rendered as an image
    img/pNNN_K.png  every embedded image at its native resolution
    images.txt      one line per embedded image: file, size, position on the page.
                    Nearly blank images are marked; they are usually panel backgrounds.

Answer areas, exhibits and the marked correct answers are usually images and
are NOT in the text layer, so the page renders have to be looked at.
Needs PyMuPDF:  pip install pymupdf
"""
import os
import sys

try:
    import fitz
except ImportError:
    sys.exit("PyMuPDF is not installed. Run: pip install pymupdf")

if len(sys.argv) < 3:
    sys.exit('Usage: python tools/extract-pdf.py "<exam.pdf>" "<work folder>"')

pdf_path, out = sys.argv[1], sys.argv[2]
doc = fitz.open(pdf_path)
os.makedirs(os.path.join(out, "pages"), exist_ok=True)
os.makedirs(os.path.join(out, "img"), exist_ok=True)

with open(os.path.join(out, "text.txt"), "w", encoding="utf-8") as f:
    for i, page in enumerate(doc):
        f.write("\n\n=================== PAGE %d ===================\n" % (i + 1))
        f.write(page.get_text())

for i, page in enumerate(doc):
    page.get_pixmap(matrix=fitz.Matrix(2.2, 2.2)).save(os.path.join(out, "pages", "p%03d.png" % (i + 1)))

lines = []
blank = 0
for i, page in enumerate(doc):
    infos = [x for x in page.get_image_info(xrefs=True) if x.get("xref")]
    infos.sort(key=lambda x: (x["bbox"][1], x["bbox"][0]))
    k = 0
    for info in infos:
        w, h = info["width"], info["height"]
        if w < 120 or h < 30:
            continue  # logos and decoration
        try:
            pix = fitz.Pixmap(doc, info["xref"])
            if pix.n - pix.alpha >= 4:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            if pix.alpha:
                pix = fitz.Pixmap(pix, 0)
            flat = ""
            try:
                ratio = pix.color_topusage()[0]
                if ratio > 0.97:
                    flat = "  nearly-blank(%.3f): probably a panel background" % ratio
                    blank += 1
            except Exception:
                pass
            k += 1
            name = "img/p%03d_%d.png" % (i + 1, k)
            pix.save(os.path.join(out, name))
            bbox = [round(v) for v in info["bbox"]]
            lines.append("%s  %dx%d  bbox=%s  page_height=%d%s" % (name, w, h, bbox, round(page.rect.height), flat))
        except Exception as error:
            lines.append("p%03d image %s could not be extracted: %s" % (i + 1, info["xref"], error))

with open(os.path.join(out, "images.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print("pages: %d" % len(doc))
print("embedded images saved: %d (%d are nearly blank and marked as such in images.txt)" % (len(lines), blank))
print("output: %s" % os.path.abspath(out))
