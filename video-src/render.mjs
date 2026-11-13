// Renderiza promo.html a MP4 (1920×1080, 30 fps) fotograma a fotograma.
//
// Uso:
//   node video-src/render.mjs                       -> assets/video/mindflow-demo.mp4 + póster
//   node video-src/render.mjs --stills 2,8,15 out/  -> capturas PNG de esos segundos (para revisar)
//
// Variables opcionales:
//   FONT_DIR  carpeta con local.css + .woff2 de Google Fonts (si el render no tiene acceso a internet)
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const FPS = 30;
const args = process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 });

const fontDir = process.env.FONT_DIR;
if (fontDir && existsSync(path.join(fontDir, "local.css"))) {
  const css = readFileSync(path.join(fontDir, "local.css"), "utf8").replace(/url\(([^)]+\.woff2)\)/g, "url(https://fonts.gstatic.com/local/$1)");
  await page.route("https://fonts.googleapis.com/**", (r) => r.fulfill({ contentType: "text/css", body: css }));
  await page.route("https://fonts.gstatic.com/**", (r) =>
    r.fulfill({ contentType: "font/woff2", body: readFileSync(path.join(fontDir, path.basename(new URL(r.request().url()).pathname))) })
  );
}

await page.goto("file://" + path.join(here, "promo.html"));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
const duration = await page.evaluate(() => window.DURATION);

if (args[0] === "--stills") {
  const times = args[1].split(",").map(Number);
  const out = args[2] || ".";
  mkdirSync(out, { recursive: true });
  for (const t of times) {
    await page.evaluate((t) => window.seek(t), t);
    await page.screenshot({ path: path.join(out, `still-${String(t).padStart(5, "0")}.png`) });
  }
  await browser.close();
  process.exit(0);
}

const outMp4 = path.join(root, "assets/video/mindflow-demo.mp4");
mkdirSync(path.dirname(outMp4), { recursive: true });
const ff = spawn("ffmpeg", [
  "-y", "-loglevel", "error",
  "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
  "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-pix_fmt", "yuv420p",
  "-profile:v", "high", "-movflags", "+faststart", "-vf", "scale=1920:1080",
  outMp4,
], { stdio: ["pipe", "inherit", "inherit"] });

const total = Math.round(duration * FPS);
for (let f = 0; f < total; f++) {
  const t = f / FPS;
  await page.evaluate((t) => window.seek(t), t);
  const buf = await page.screenshot({ type: "jpeg", quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % 150 === 0) console.log(`frame ${f}/${total}`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));

// Póster (escena del chat) y portada para redes
for (const [t, file] of [[10.8, "assets/img/video-poster.jpg"], [36.5, "assets/img/og-cover.jpg"]]) {
  await page.evaluate((t) => window.seek(t), t);
  await page.screenshot({ path: path.join(root, file), type: "jpeg", quality: 85 });
}
await browser.close();
console.log("OK ->", outMp4);
