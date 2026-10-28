import { readFile, mkdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const catalog = JSON.parse(await readFile(new URL("../content/photo-catalog.json", import.meta.url), "utf8"));
const directory = new URL("../public/images/", import.meta.url);
const selected = process.argv.slice(2);
if (selected.some(key => !Object.hasOwn(catalog, key))) throw new Error("Unknown photo key");
await mkdir(directory, { recursive: true });

async function download([key, photo]) {
  const output = fileURLToPath(new URL(`${key}.webp`, directory));
  if (!selected.length) {
    try { await access(output); console.log(`Already present: ${key}`); return; } catch {}
  }
  const url = `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
    throw new Error(`${key}: download failed (${response.status})`);
  }
  const input = Buffer.from(await response.arrayBuffer());
  const info = await sharp(input).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
  console.log(`${key}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
}

const entries = Object.entries(catalog).filter(([key]) => !selected.length || selected.includes(key));
for (let i = 0; i < entries.length; i += 3) {
  const results = await Promise.allSettled(entries.slice(i, i + 3).map(download));
  for (const result of results) {
    if (result.status === "rejected") { console.error(result.reason); process.exitCode = 1; }
  }
}
