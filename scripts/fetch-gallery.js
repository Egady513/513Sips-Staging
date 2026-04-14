/**
 * scripts/fetch-gallery.js
 *
 * Auto-discovers all Cloudinary root folders, fetches their images,
 * and writes gallery-data.json. New gig folders appear automatically
 * with no code changes — just add the folder in Cloudinary.
 *
 * Run via GitHub Actions on Cloudinary webhook, or manually:
 *   CLOUDINARY_CLOUD_NAME=xxx CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=xxx node scripts/fetch-gallery.js
 *
 * Required env vars:
 *   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dkfypt2cb';
const API_KEY    = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

// ── Folders to NEVER show in the gallery ─────────────────────────────────────
// Update this list if you add more private folders to Cloudinary.
const EXCLUDED_FOLDERS = new Set(['Do not use', 'Logos', 'Videos']);

// ── Display label overrides (Cloudinary folder name → gallery tab label) ──────
const LABEL_OVERRIDES = {
  'General bar photos':                    'Behind the Bar',
  'Birthday Party - Natalies First Rodeo': "Natalie's First Rodeo",
  "Birthday Party - Eddie's 36th":         "Eddie's 36th Birthday",
};

// ── Pinned order: these folders appear first, in this order ──────────────────
// All other folders appear alphabetically after the pinned ones.
const PINNED_ORDER = ['Cocktails', 'General bar photos'];

// ── Helpers ───────────────────────────────────────────────────────────────────
function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function gridSize(count) {
  if (count >= 15) return 'grid-large';
  if (count >= 5)  return 'grid-medium';
  return 'grid-small';
}

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
    https.get(
      { hostname: 'api.cloudinary.com', path: urlPath, headers: { Authorization: `Basic ${auth}` } },
      (res) => {
        let raw = '';
        res.on('data', chunk => (raw += chunk));
        res.on('end', () => {
          try { resolve(JSON.parse(raw)); }
          catch (e) { reject(new Error(`JSON parse error for ${urlPath}: ${raw.slice(0, 300)}`)); }
        });
      }
    ).on('error', reject);
  });
}

// Fetch all images in a folder using the Search API
// Required for Dynamic Folder mode — asset_folder param on resources endpoint doesn't filter
function apiPost(urlPath, body) {
  return new Promise((resolve, reject) => {
    const auth    = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
    const payload = JSON.stringify(body);
    const req = require('https').request(
      {
        hostname: 'api.cloudinary.com',
        path:     urlPath,
        method:   'POST',
        headers:  {
          Authorization:  `Basic ${auth}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', chunk => (raw += chunk));
        res.on('end', () => {
          try { resolve(JSON.parse(raw)); }
          catch (e) { reject(new Error(`JSON parse error: ${raw.slice(0, 300)}`)); }
        });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function fetchFolderImages(folderName) {
  const photos = [];
  let nextCursor = null;

  do {
    const body = {
      expression:  `asset_folder="${folderName}"`,
      max_results: 500,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    };
    const data = await apiPost(`/v1_1/${CLOUD_NAME}/resources/search`, body);
    if (data.error) throw new Error(`Cloudinary Search API error: ${JSON.stringify(data.error)}`);
    (data.resources || []).forEach(r => photos.push(r.public_id));
    nextCursor = data.next_cursor || null;
  } while (nextCursor);

  return photos;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!API_KEY || !API_SECRET) {
    console.warn('[fetch-gallery] No Cloudinary credentials — skipping. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.');
    process.exit(0);
  }

  console.log('[fetch-gallery] Fetching root folders from Cloudinary...');
  const { folders } = await apiGet(`/v1_1/${CLOUD_NAME}/folders`);

  const galleryFolders = (folders || []).filter(f => !EXCLUDED_FOLDERS.has(f.name));
  console.log(`[fetch-gallery] Processing ${galleryFolders.length} gallery folders (${EXCLUDED_FOLDERS.size} excluded)`);

  const sections = [];

  for (const folder of galleryFolders) {
    process.stdout.write(`  "${folder.name}"... `);
    const photos = await fetchFolderImages(folder.name);

    if (photos.length === 0) {
      console.log('empty, skipping.');
      continue;
    }

    const label = LABEL_OVERRIDES[folder.name] || folder.name;
    sections.push({
      id:         toSlug(label),
      label,
      folderName: folder.name,
      gridSize:   gridSize(photos.length),
      photos,
    });
    console.log(`${photos.length} photos ✓`);
  }

  // Sort: pinned folders first (in order), then alphabetically by label
  sections.sort((a, b) => {
    const ai = PINNED_ORDER.indexOf(a.folderName);
    const bi = PINNED_ORDER.indexOf(b.folderName);
    if (ai >= 0 && bi >= 0) return ai - bi;
    if (ai >= 0) return -1;
    if (bi >= 0) return  1;
    return a.label.localeCompare(b.label);
  });

  // Safety guard — never write an empty gallery (protects against bad API responses)
  if (sections.length === 0) {
    console.error('[fetch-gallery] ❌ Aborting — API returned 0 sections. gallery-data.json left unchanged.');
    console.error('[fetch-gallery]    Check that CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are valid.');
    process.exit(1);
  }

  const output = {
    lastUpdated: new Date().toISOString(),
    totalPhotos: sections.reduce((n, s) => n + s.photos.length, 0),
    sections,
  };

  const outPath = path.join(__dirname, '..', 'gallery-data.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\n[fetch-gallery] ✅ Done — ${output.sections.length} sections, ${output.totalPhotos} photos → gallery-data.json`);
}

main().catch(err => {
  console.error('[fetch-gallery] ❌ Error:', err.message || err);
  process.exit(1);
});
