const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const ts = require("typescript");
const sharp = require("sharp");

// Load both content trees without starting Next or touching the dev build cache.
require.extensions[".ts"] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  module._compile(result.outputText, filename);
};

const root = path.resolve(__dirname, "..");
async function main() {
  for (const locale of ["en", "ar"]) {
    const content = require(path.join(root, "content", `${locale}.ts`))[locale];
    const images = [content.home.why.image, ...content.projects.flatMap(project => [project.cover, ...project.gallery])];
    for (const image of images) {
      if (!image.src || !image.alt || !image.credit) throw new Error(`Incomplete ${locale} image slot`);
      const metadata = await sharp(path.join(root, "public", image.src)).metadata();
      if (metadata.format !== "webp" || metadata.width < 900) throw new Error(`Invalid image: ${image.src}`);
    }
    console.log(`${locale}: ${images.length} image slots verified`);
  }

  if (process.argv.includes("--contact-sheet")) {
    const catalog = require("../content/photo-catalog.json");
    const entries = Object.entries(catalog);
    const tiles = await Promise.all(entries.map(async ([key], i) => {
      const image = await sharp(path.join(root, "public/images", `${key}.webp`)).resize(280, 190, { fit: "cover" }).toBuffer();
      const label = Buffer.from(`<svg width="280" height="30"><rect width="280" height="30" fill="white"/><text x="8" y="20" font-size="14" fill="black">${key}</text></svg>`);
      return [
        { input: image, left: (i % 4) * 280, top: Math.floor(i / 4) * 220 },
        { input: label, left: (i % 4) * 280, top: Math.floor(i / 4) * 220 + 190 },
      ];
    }));
    const output = path.join(os.tmpdir(), "ivory-photo-review.jpg");
    await sharp({ create: { width: 1120, height: Math.ceil(entries.length / 4) * 220, channels: 3, background: "#eee" } })
      .composite(tiles.flat()).jpeg().toFile(output);
    console.log(output);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
