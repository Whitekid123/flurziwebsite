// Usage: node scripts/screenshots.mjs [baseUrl]
import { chromium } from "playwright";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const base = process.argv[2] || "http://localhost:3400";
const out = new URL("../screenshots/", import.meta.url).pathname;
fs.mkdirSync(out, { recursive: true });

const exe = fs.existsSync("/usr/bin/google-chrome") ? "/usr/bin/google-chrome" : undefined;
const browser = await chromium.launch({
  executablePath: exe,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function scrollTo(page, y) {
  await page.evaluate((y) => {
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  }, y);
}

async function warm(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 400) {
    await scrollTo(page, y);
    await wait(90);
  }
  await wait(1500);
  await scrollTo(page, 0);
  await wait(1500);
}

const targets = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: "mobile", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

const sections = ["ecosystem", "products", "sponsorsafe", "commit", "cinema", "endnovel", "capabilities", "about", "future", "contact"];

for (const t of targets) {
  const { name, ...opts } = t;
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base, { waitUntil: "networkidle" });
  await wait(3000);
  await page.screenshot({ path: `${out}${name}-01-hero.png` });
  await warm(page);
  // Stitched full-page capture: Chrome's native fullPage capture tiles badly with
  // smooth-scroll transforms, so capture viewport-sized slices and stitch them.
  const vh = opts.viewport.height;
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const tileDir = `${out}.tiles-${name}/`;
  fs.rmSync(tileDir, { recursive: true, force: true });
  fs.mkdirSync(tileDir, { recursive: true });
  let n = 0;
  for (let y = 0; y < total; y += vh) {
    await scrollTo(page, y);
    if (n === 1) await page.addStyleTag({ content: "header{visibility:hidden!important}" });
    await wait(500);
    await page.screenshot({ path: `${tileDir}${String(n++).padStart(3, "0")}.png` });
  }
  execFileSync("python3", [new URL("./stitch.py", import.meta.url).pathname, tileDir, String(total), String(vh), `${out}${name}-full.png`]);
  fs.rmSync(tileDir, { recursive: true, force: true });
  await page.reload({ waitUntil: "networkidle" });
  await wait(2000);
  await warm(page);
  let i = 2;
  for (const id of sections) {
    const y = await page.evaluate((id) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    }, id);
    if (y == null) continue;
    await scrollTo(page, Math.max(0, y - (id === "products" ? 40 : 0)));
    await wait(1600);
    await page.screenshot({ path: `${out}${name}-${String(i++).padStart(2, "0")}-${id}.png` });
  }
  console.log(name, errors.length ? errors : "no console errors");
  await ctx.close();
}
await browser.close();
