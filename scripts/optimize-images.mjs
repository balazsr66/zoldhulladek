import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const imagesDir = path.join(publicDir, "images");

await fs.mkdir(imagesDir, { recursive: true });

const publicFiles = await fs.readdir(publicDir);

const resolveSource = (label, predicate) => {
  const file = publicFiles.find(predicate);
  if (!file) {
    throw new Error(`Missing source for ${label}`);
  }
  return path.join(publicDir, file);
};

const sources = {
  heroDesktop: resolveSource("heroDesktop", (f) => /^boz/i.test(f) && f.toLowerCase().endsWith(".webp")),
  heroMobile: resolveSource("heroMobile", (f) => f.toLowerCase() === "mdb_hero_mobile.webp"),
  problem: resolveSource("problem", (f) => f.toLowerCase() === "nagy_bozot.webp"),
  mdb: resolveSource(
    "mdb",
    (f) => /^mdb_/i.test(f) && !f.toLowerCase().includes("hero") && f.toLowerCase().endsWith(".webp")
  ),
  before: resolveSource("before", (f) => f.toLowerCase() === "beforeimg.webp"),
  after: resolveSource("after", (f) => f.toLowerCase() === "afterimg.webp"),
};

const jobs = [
  {
    sourceKey: "heroDesktop",
    outputs: [
      { path: "images/hero-desktop-1024.webp", width: 1024, quality: 62 },
      { path: "images/hero-desktop-1280.webp", width: 1280, quality: 64 },
      { path: "images/hero-desktop-1600.webp", width: 1600, quality: 66 },
    ],
  },
  {
    sourceKey: "heroMobile",
    outputs: [
      { path: "images/hero-mobile-540.webp", width: 540, quality: 56 },
      { path: "images/hero-mobile-828.webp", width: 828, quality: 58 },
      { path: "images/hero-mobile-960.webp", width: 960, quality: 60 },
      { path: "mdb_hero_mobile.webp", width: 960, quality: 58 },
    ],
  },
  {
    sourceKey: "problem",
    outputs: [
      { path: "images/problem-640.webp", width: 640, quality: 60 },
      { path: "images/problem-800.webp", width: 800, quality: 62 },
      { path: "images/problem-1200.webp", width: 1200, quality: 64 },
      { path: "nagy_bozot.webp", width: 1200, quality: 60 },
    ],
  },
  {
    sourceKey: "mdb",
    outputs: [
      { path: "images/mdb-800.webp", width: 800, quality: 64 },
      { path: "images/mdb-1200.webp", width: 1200, quality: 66 },
    ],
  },
  {
    sourceKey: "before",
    outputs: [
      { path: "images/before-960.webp", width: 960, quality: 60 },
      { path: "images/before-1536.webp", width: 1536, quality: 62 },
    ],
  },
  {
    sourceKey: "after",
    outputs: [
      { path: "images/after-960.webp", width: 960, quality: 58 },
      { path: "images/after-1280.webp", width: 1280, quality: 60 },
    ],
  },
];

const formatKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

for (const job of jobs) {
  const sourcePath = sources[job.sourceKey];
  const sourceBuffer = await fs.readFile(sourcePath);

  for (const output of job.outputs) {
    const outputPath = path.join(publicDir, output.path);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    const buffer = await sharp(sourceBuffer)
      .rotate()
      .resize({
        width: output.width,
        withoutEnlargement: true,
      })
      .webp({
        quality: output.quality,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();

    await fs.writeFile(outputPath, buffer);

    const meta = await sharp(buffer).metadata();
    console.log(
      `${output.path}\t${meta.width}x${meta.height}\t${formatKB(buffer.length)}`
    );
  }
}

