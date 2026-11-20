// Exporta las publicaciones de Instagram (1080×1350) y un Reel vertical (1080×1920) sin audio.
// Uso: node marketing/instagram/src/render.mjs
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "..");

const names = ["1-presentacion", "2-el-problema", "3-reduce-ausencias", "4-kit-gratis"];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1400 }, deviceScaleFactor: 1 });
await page.goto("file://" + path.join(here, "posts.html"));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
const posts = page.locator(".post");
const files = [];
for (let i = 0; i < names.length; i++) {
  const f = path.join(out, `post-${names[i]}.png`);
  await posts.nth(i).screenshot({ path: f });
  files.push(f);
}
await browser.close();
if (process.env.SKIP_REEL) { console.log("OK (solo imágenes) ->", out); process.exit(0); }

// Reel: cada publicación 3,5 s con zoom suave, sobre fondo desenfocado, 1080×1920 a 30 fps
const D = 3.5, FPS = 30, frames = Math.round(D * FPS);
// una sola imagen por entrada: zoompan genera los fotogramas (sin -loop, que multiplicaría la duración)
const inputs = files.flatMap((f) => ["-i", f]);
const chains = files.map((_, i) =>
  `[${i}:v]split[a${i}][b${i}];` +
  `[a${i}]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:2,eq=brightness=-0.12,loop=loop=${frames - 1}:size=1:start=0,setpts=N/${FPS}/TB[bg${i}];` +
  `[b${i}]scale=1620:-1,zoompan=z='min(1+0.0009*on,1.09)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=1080x1350:fps=${FPS}[fg${i}];` +
  `[bg${i}][fg${i}]overlay=0:(H-h)/2:shortest=1,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.3,fade=t=out:st=${D - 0.3}:d=0.3[v${i}]`
).join(";");
const concat = files.map((_, i) => `[v${i}]`).join("") + `concat=n=${files.length}:v=1:a=0[out]`;
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", chains + ";" + concat,
  "-map", "[out]", "-r", String(FPS), "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", path.join(out, "reel-mindflow.mp4")]);
console.log("OK ->", out);
