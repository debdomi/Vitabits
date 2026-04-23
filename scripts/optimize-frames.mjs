// Reads Frames/*.jpg → writes public/frames/frame-NNN.webp at retina
// display size. Keeps a single tier; slow connections get the MP4 fallback.
//
// Budget (brief): ≤ 2.5 MB mobile, ≤ 6 MB desktop.
import { readdir, mkdir, stat, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.resolve("Frames");
const OUT_DIR = path.resolve("public/frames");
const MANIFEST_PATH = path.resolve("public/frames/manifest.json");

const TARGET_WIDTH = 1200; // 2x of a ~600px display
const WEBP_QUALITY = 68;

async function run() {
  if (!existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.error("No frames found in Frames/");
    process.exit(1);
  }

  let totalBytes = 0;
  const entries = [];

  for (let i = 0; i < files.length; i++) {
    const src = path.join(SRC_DIR, files[i]);
    const index = String(i).padStart(3, "0");
    const outName = `frame-${index}.webp`;
    const out = path.join(OUT_DIR, outName);

    await sharp(src)
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 5 })
      .toFile(out);

    const { size } = await stat(out);
    totalBytes += size;
    entries.push({ index: i, file: `/frames/${outName}`, bytes: size });

    process.stdout.write(
      `\r[${i + 1}/${files.length}] ${outName} (${(size / 1024).toFixed(1)} KB)`
    );
  }

  // Write a manifest so the client knows exactly how many frames
  // exist and where to fetch them from.
  const manifest = {
    generatedAt: new Date().toISOString(),
    frameCount: entries.length,
    width: TARGET_WIDTH,
    format: "webp",
    totalBytes,
    pattern: "/frames/frame-{INDEX}.webp",
    padLength: 3,
  };
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(
    `\n\nDone. ${entries.length} frames → ${(totalBytes / 1024 / 1024).toFixed(
      2
    )} MB total`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
