// One-off asset optimizer: extracts rasters embedded in the seasonal SVGs,
// compresses the hero/logo images, and emits WebP files next to the originals.
// Run: node scripts/optimize-assets.mjs
import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const PUBLIC = path.resolve(import.meta.dirname, '..', 'public');

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function report(label, srcPath, outPath) {
    const before = (await stat(srcPath)).size;
    const after = (await stat(outPath)).size;
    console.log(`${label}: ${kb(before)} -> ${kb(after)}  (${path.relative(PUBLIC, outPath)})`);
}

// Seasonal SVGs are base64 PNGs wrapped in an <svg> — pull the raster out
// and save a downscaled WebP. Decorations render these at <= 100px, the
// greeting overlays at <= 260px, so 512px wide is generous.
async function svgRasterToWebp(relSvg, width = 512) {
    const svgPath = path.join(PUBLIC, relSvg);
    const svg = await readFile(svgPath, 'utf8');
    const match = svg.match(/data:image\/(png|jpe?g);base64,([A-Za-z0-9+/=]+)/);
    if (!match) {
        console.warn(`SKIP ${relSvg}: no embedded raster found`);
        return;
    }
    const raster = Buffer.from(match[2], 'base64');
    const outPath = svgPath.replace(/\.svg$/, '.webp');
    await sharp(raster)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);
    await report(relSvg, svgPath, outPath);
}

async function pngToWebp(relPng, width, outRel = null, quality = 80) {
    const srcPath = path.join(PUBLIC, relPng);
    const outPath = path.join(PUBLIC, outRel ?? relPng.replace(/\.png$/, '.webp'));
    await sharp(srcPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toFile(outPath);
    await report(relPng, srcPath, outPath);
}

// Shrink a favicon PNG in place to a sane size (keeps PNG format for
// favicon/manifest compatibility).
async function shrinkPng(relPng, width) {
    const srcPath = path.join(PUBLIC, relPng);
    const buf = await sharp(await readFile(srcPath))
        .resize({ width, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();
    const before = (await stat(srcPath)).size;
    await writeFile(srcPath, buf);
    console.log(`${relPng}: ${kb(before)} -> ${kb(buf.length)} (in place)`);
}

const meta = await sharp(path.join(PUBLIC, 'favico/favico.png')).metadata();
console.log(`favico.png source dimensions: ${meta.width}x${meta.height}`);

// Seasonal artwork
for (const rel of [
    'Ramadan/Lantern.svg',
    'Ramadan/Helal.svg',
    'EidAlFitr/Lantern.svg',
    'EidAlFitr/PrayerMat.svg',
    'EidAlFitr/Dates.svg',
    'EidAlFitr/Crescent.svg',
    'EidAlAdha/Mosque.svg',
    'EidAlAdha/Kaaba.svg',
    'EidAlAdha/Sheep.svg',
    'EidAlAdha/Crescent.svg',
]) {
    await svgRasterToWebp(rel);
}

// Hero images
await pngToWebp('assets/hero.png', 1300);
await pngToWebp('assets/hero-illustration.png', 1000);

// Navbar logos (one per season variant, rendered at 160x80 css px → 320 retina)
await pngToWebp('favico/favico.png', 320, 'favico/logo.webp');
await pngToWebp('favico/favico.Ramadan.png', 320, 'favico/logo.Ramadan.webp');
await pngToWebp('favico/favico.EidAlFitr.png', 320, 'favico/logo.EidAlFitr.webp');
await pngToWebp('favico/favico.EidAlAdha.png', 320, 'favico/logo.EidAlAdha.webp');

// Favicons stay PNG but shrink to 512px max
for (const rel of [
    'favico/favico.png',
    'favico/favico.Ramadan.png',
    'favico/favico.EidAlFitr.png',
    'favico/favico.EidAlAdha.png',
]) {
    await shrinkPng(rel, 512);
}

console.log('done');
