// Genera assets/kit/kit-plantillas-mindflow.pdf (kit gratis de 20 plantillas).
//
// Uso:
//   python3 kit-src/build_free.py      -> genera cover.html, body.html y cta.html
//   node kit-src/render-kit.mjs        -> los convierte en PDF y los une
//   SITE_URL="https://tu-web/" python3 kit-src/build_free.py   (para cambiar el enlace del cierre)
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const browser = await chromium.launch();
const page = await browser.newPage();
const parts = [];
for (const name of ["cover", "body", "cta"]) {
  await page.goto("file://" + path.join(here, name + ".html"));
  await page.evaluate(() => document.fonts.ready);
  const file = path.join(here, name + ".pdf");
  const opts = { path: file, format: "A4", printBackground: true, preferCSSPageSize: true };
  if (name === "body") {
    Object.assign(opts, {
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate:
        '<div style="font-family:Inter,Arial,sans-serif;font-size:7.5pt;color:#8a8fae;width:100%;padding:0 16mm;display:flex;justify-content:space-between;"><span>Mindflow · Kit gratuito · 20 plantillas para psicólogos</span><span class="pageNumber"></span></div>',
    });
  }
  await page.pdf(opts);
  parts.push(file);
}
await browser.close();

const out = path.join(root, "assets/kit/kit-plantillas-mindflow.pdf");
execFileSync("pdfunite", [...parts, out]);
console.log("OK ->", out);
