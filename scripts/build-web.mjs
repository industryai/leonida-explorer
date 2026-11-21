import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const out = resolve(root, "www");
const files = [
  "index.html",
  "privacy.html",
  "styles.css",
  "script.js",
  "story-content.js",
  "quality-pass.js",
  "cheats.js",
  "pwa.js",
  "sw.js",
  "manifest.webmanifest",
  "icon.svg",
  "icon-192.svg",
  "icon-512.svg"
];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const file of files) {
  if (!existsSync(resolve(root, file))) {
    throw new Error(`Required web asset is missing: ${file}`);
  }
  copyFileSync(resolve(root, file), resolve(out, file));
}

if (existsSync(resolve(root, "assets"))) {
  cpSync(resolve(root, "assets"), resolve(out, "assets"), { recursive: true });
}

console.log(`VICECITYWIRE web bundle prepared in www/ (${files.length} files plus assets/).`);
