/**
 * Converts all product images to WebP and renames them to a clean
 * kebab-case convention (no prices, no dimensions in the filename).
 *
 * Mapping rules:
 *  - Strip price suffixes like "-60rs", "-30rs", etc.
 *  - Strip "Star-" prefix where it is redundant (pack images keep a
 *    descriptive name without "Star-")
 *  - New images folder files are moved into the main products folder
 *  - Output: products/ (flat, all .webp)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = path.join(__dirname, '../src/assets/images/products');
const NEW_IMAGES_DIR = path.join(PRODUCTS_DIR, 'New images');

/**
 * Clean rename map: old filename (no extension) → new filename (no extension)
 * Keys are lowercase for matching.
 */
const RENAME_MAP = {
  // ── Soaps ──
  'skin-care-soap-50g-30rs':                  'skin-care-soap-50g',
  'skin-care-soap-80g-50rs':                  'skin-care-soap-80g',
  'skin-care-soap-100g-60rs':                 'skin-care-soap-100g',
  'aloevera-cool-soap-50g-30rs':              'aloevera-cool-soap-50g',
  'aloevera-cool-soap-80g-50rs':              'aloevera-cool-soap-80g',
  'aloevera-cool-soap-100g-60rs':             'aloevera-cool-soap-100g',
  'charcoal-multani-mitti-soap-50g-30rs':     'charcoal-multani-mitti-soap-50g',
  'charcoal-multani-mitti-soap-100g-60rs':    'charcoal-multani-mitti-soap-100g',
  'baby-soap-50g-30rs':                       'baby-soap-50g',
  'baby-soap-80g-50rs':                       'baby-soap-80g',
  'baby-soap-100g-60rs':                      'baby-soap-100g',
  'besan-pithi-soap-50g-30rs':                'besan-pithi-soap-50g',
  'nim-aloevera-soap-50g-30rs':               'neem-aloevera-soap-50g',
  'nim-aloevera-soap-80g-50rs':               'neem-aloevera-soap-80g',
  'nim-aloevera-soap-100g-60rs':              'neem-aloevera-soap-100g',
  'body-whitening-soap-100g-70rs':            'body-whitening-soap-100g',
  'milky-soap-50g-70rs':                      'milky-soap-50g',
  'honey-soap-50g-30rs':                      'honey-soap-50g',
  'kesar-chandan-soap-8g-15rs':               'kesar-chandan-soap-8g',
  'kesar-chandan-soap-20g-30rs':              'kesar-chandan-soap-20g',
  'kesar-chandan-soap-100g-100rs':            'kesar-chandan-soap-100g',

  // ── Shampoo ──
  'herbal-shampoo-100ml-70rs':                'herbal-shampoo-100ml',
  'herbal-shampoo-200ml-140rs':               'herbal-shampoo-200ml',
  'herbal-shampoo-500ml-350rs':               'herbal-shampoo-500ml',

  // ── Oil ──
  'herbal-oil-100ml-140rs':                   'herbal-oil-100ml',
  'herbal-oil-200ml-280rs':                   'herbal-oil-250ml',   // renamed: product is 250ml
  'herbal-oil-500ml-700rs':                   'herbal-oil-500ml',

  // ── Face Gel / Face Wash ──
  'herbal-face-gel-100ml-50rs':               'herbal-face-gel-100ml',
  'herbal-face-wash-120ml-100rs':             'herbal-face-wash-120ml',

  // ── Pack images (from New images folder) ──
  'star-alovera-cool-soap-pack':              'aloevera-cool-soap-pack',
  'star-baby-soap-pack':                      'baby-soap-pack',
  'star-body-whitening-soap-pack':            'body-whitening-soap-pack',
  'star-charcoal-multani-mitti-soap-pack':    'charcoal-multani-mitti-soap-pack',
  'star-kesar-soap-pack':                     'kesar-chandan-soap-pack',
  'star-milky-soap-pack':                     'milky-soap-pack',
  'star-neem-alovera-soap-pack':              'neem-aloevera-soap-pack',
  'star-skincare-soap-pack':                  'skin-care-soap-pack',

  // ── New branded shampoo / oil (from New images folder) ──
  'star-herbal-shampoo':                      'herbal-shampoo-100ml-branded',
  'star-herbal-shampoo-200ml':                'herbal-shampoo-200ml-branded',
  'star-herbal-shampoo-500ml':                'herbal-shampoo-500ml-branded',
  'star-herbal-oil-100ml':                    'herbal-oil-100ml-branded',
  'star-herbal-oil-250ml':                    'herbal-oil-250ml-branded',
  'star-herbal-oil-500ml':                    'herbal-oil-500ml-branded',
};

// Files to skip entirely (Star Facial Soap removed)
const SKIP_FILES = new Set([
  'star-facial-soap-8g-10rs',
  'star-facial-soap-22g-25rs',
  'star-facial-soap-50g-60rs',
]);

async function convertFile(srcPath, destName) {
  const destPath = path.join(PRODUCTS_DIR, `${destName}.webp`);
  await sharp(srcPath)
    .webp({ quality: 85 })
    .toFile(destPath);
  console.log(`  ✓ ${path.basename(srcPath)} → ${destName}.webp`);
}

async function processDirectory(dir, label) {
  console.log(`\nProcessing: ${label}`);
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

  for (const file of files) {
    const ext = path.extname(file);
    const baseLower = path.basename(file, ext).toLowerCase();

    if (SKIP_FILES.has(baseLower)) {
      console.log(`  ⊘ SKIP  ${file}`);
      continue;
    }

    const newName = RENAME_MAP[baseLower];
    if (!newName) {
      console.log(`  ? NO MAP for: ${file} (skipping)`);
      continue;
    }

    await convertFile(path.join(dir, file), newName);
  }
}

async function main() {
  console.log('=== Image conversion: JPEG/PNG → WebP ===');

  // Process main products folder (existing images)
  await processDirectory(PRODUCTS_DIR, 'Main products folder');

  // Process New images subfolder
  if (fs.existsSync(NEW_IMAGES_DIR)) {
    await processDirectory(NEW_IMAGES_DIR, 'New images folder');
  }

  console.log('\n=== Done ===');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
