import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.platform !== 'darwin') {
  throw new Error('Rendering the social image requires macOS sips. The exported PNG is committed for production builds.');
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = join(root, 'public', 'armsteel-charlie-og-v1.svg');
const markPath = join(root, 'public', 'branding', 'armsteel-mark.svg');
const outputPath = join(root, 'public', 'armsteel-charlie-og-v1.png');
const source = readFileSync(sourcePath, 'utf8');
const mark = readFileSync(markPath, 'utf8');
const imageTag = source.match(/<image href="\.\/branding\/armsteel-mark\.svg"[^>]*\/>/);
const markGroup = mark.match(/<g fill="currentColor">([\s\S]*?)<\/g>/);
const viewBox = mark.match(/viewBox="([^"]+)"/)?.[1];

if (!imageTag || !markGroup || !viewBox) {
  throw new Error('Could not find the mark image or its original vector paths.');
}

const attribute = (name) => imageTag[0].match(new RegExp(`${name}="([^"]+)"`))?.[1];
const x = attribute('x');
const y = attribute('y');
const width = attribute('width');
const height = attribute('height');
const preserveAspectRatio = attribute('preserveAspectRatio') ?? 'xMidYMid meet';

if (![x, y, width, height].every(Boolean)) {
  throw new Error('The mark image needs explicit x, y, width, and height values.');
}

const inlineMark = `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${viewBox}" preserveAspectRatio="${preserveAspectRatio}"><g fill="#e7e5e0">${markGroup[1]}</g></svg>`;
const exportSvg = source.replace(imageTag[0], inlineMark);
const tempDirectory = mkdtempSync(join(tmpdir(), 'armsteel-og-'));
const tempSvgPath = join(tempDirectory, 'armsteel-charlie-og-v1.svg');

try {
  writeFileSync(tempSvgPath, exportSvg, 'utf8');
  execFileSync('sips', ['-s', 'format', 'png', tempSvgPath, '--out', outputPath], { stdio: 'inherit' });
  console.log(`Rendered ${outputPath}`);
} finally {
  rmSync(tempDirectory, { recursive: true, force: true });
}
