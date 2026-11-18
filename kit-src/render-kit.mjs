// Genera assets/kit/kit-plantillas-mindflow.pdf a partir de kit-src/kit.html
//
// Uso:
//   node kit-src/render-kit.mjs
//   SITE_URL="https://tu-sitio.netlify.app/" node kit-src/render-kit.mjs
//   node kit-src/render-kit.mjs --png out/   -> además, una imagen PNG por página (para revisar)
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const siteUrl = process.env.SITE_URL || "https://mindflowbotweb.netlify.app/";
const siteText = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

const html = readFileSync(path.join(here, "kit.html"), "utf8")
  .replaceAll("{{SITE_URL}}", siteUrl)
  .replaceAll("{{SITE_URL_TEXT}}", siteText);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

const out = path.join(root, "assets/kit/kit-plantillas-mindflow.pdf");
mkdirSync(path.dirname(out), { recursive: true });
await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
console.log("OK ->", out);

const pngIdx = process.argv.indexOf("--png");
if (pngIdx > -1) {
  const dir = process.argv[pngIdx + 1] || ".";
  mkdirSync(dir, { recursive: true });
  // 210mm x 297mm at 96dpi = 794 x 1123 px
  await page.setViewportSize({ width: 794, height: 1123 });
  const n = await page.$$eval(".page", (els) => els.length);
  for (let i = 0; i < n; i++) {
    await page.locator(".page").nth(i).screenshot({ path: path.join(dir, `kit-p${i + 1}.png`) });
  }
  // detect content overflowing a page
  const over = await page.$$eval(".page", (els) => els.map((el, i) => (el.scrollHeight > el.clientHeight + 2 ? i + 1 : 0)).filter(Boolean));
  console.log("pages overflowing:", over.length ? over.join(",") : "none");
}
await browser.close();
