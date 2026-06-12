// Generates public/og/default.png (1200x630) — the social sharing card.
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'og');

const WIDTH = 1200;
const HEIGHT = 630;

const background = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#0B1E33"/>
      <stop offset="55%" stop-color="#071424"/>
      <stop offset="100%" stop-color="#050B14"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1DA1F2" stop-opacity="0"/>
      <stop offset="50%" stop-color="#00E5FF"/>
      <stop offset="100%" stop-color="#1DA1F2" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="150" y="468" width="900" height="3" rx="1.5" fill="url(#line)"/>
  <text x="600" y="520" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#E6F1FF" font-weight="600">
    Custom Software Development
  </text>
  <text x="600" y="568" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#7FB3D5">
    Web &#183; Mobile &#183; SaaS &#183; AI — Serving MENA &amp; Worldwide
  </text>
</svg>
`);

await mkdir(OUT_DIR, { recursive: true });

const logo = await sharp(path.join(ROOT, 'public', 'favico', 'favico.png'))
    .resize({ width: 560, withoutEnlargement: false })
    .toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp(background)
    .composite([
        {
            input: logo,
            left: Math.round((WIDTH - (logoMeta.width ?? 560)) / 2),
            top: Math.round((440 - (logoMeta.height ?? 356)) / 2) + 20,
        },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'default.png'));

const size = (await sharp(path.join(OUT_DIR, 'default.png')).metadata());
console.log(`og/default.png generated: ${size.width}x${size.height}`);
