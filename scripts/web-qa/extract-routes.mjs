/**
 * extract-routes.mjs
 * Cartographer - Route SSOT Extractor
 *
 * Walks app/[...] /page.tsx, reads sitemap.ts declarations,
 * greps nav components for internal hrefs, then emits lib/routes.json.
 *
 * Usage: node scripts/web-qa/extract-routes.mjs
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const BASE_URL = 'https://ibtu.la';

// Helpers

function walkDir(dir, ext) {
  ext = ext || '.tsx';
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walkDir(full, ext));
    } else if (full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Convert an app/ file path to a URL path.
 * - Strip leading "app/"
 * - Drop route groups (parentheses folders)
 * - Keep dynamic segments as-is ([slug], [[...tool]])
 * - Drop "page.tsx" filename
 * - Root app/page.tsx => "/"
 */
function fileToRoutePath(absPath) {
  const rel = relative(join(ROOT, 'app'), absPath);
  const segments = rel.split('/').slice(0, -1); // drop "page.tsx"
  const filtered = segments.filter(function(seg) {
    return !(seg.startsWith('(') && seg.endsWith(')'));
  });
  if (filtered.length === 0) return '/';
  return '/' + filtered.join('/');
}

function deriveName(path) {
  if (path === '/') return 'Home';
  const last = path.split('/').filter(Boolean).pop() || '';
  if (last.startsWith('[') && last.endsWith(']')) return last;
  return last
    .replace(/-/g, ' ')
    .replace(/\b\w/g, function(c) { return c.toUpperCase(); });
}

// 1. Walk app/**/page.tsx

const appDir = join(ROOT, 'app');
const pageFiles = walkDir(appDir).filter(function(f) { return f.endsWith('page.tsx'); });

const appRoutes = pageFiles.map(function(file) {
  const path = fileToRoutePath(file);
  return {
    path: path,
    canonicalUrl: BASE_URL + path,
    pageName: deriveName(path),
    status: 'Live',
    sourceFile: 'app/' + relative(appDir, file),
  };
});

// 2. Read sitemap.ts for declared URLs

const sitemapPath = join(ROOT, 'app', 'sitemap.ts');
let sitemapText = '';
try {
  sitemapText = readFileSync(sitemapPath, 'utf8');
} catch (e) {
  console.warn('[extract-routes] sitemap.ts not found - skipping.');
}

const sitemapUrlRe = /url:\s*`\$\{baseUrl\}([^`]*)`/g;
const sitemapStaticPaths = new Set();
let m;
while ((m = sitemapUrlRe.exec(sitemapText)) !== null) {
  const p = m[1] || '/';
  // Skip template literal expressions (dynamic routes like ${p.slug}) - already captured via app/ walk
  if (p.includes('${')) continue;
  sitemapStaticPaths.add(p === '' ? '/' : p);
}

// Check for sitemap routes that have no matching app/ route
const appRoutePaths = new Set(appRoutes.map(function(r) { return r.path; }));
const sitemapOrphans = [];
for (const sp of sitemapStaticPaths) {
  if (!appRoutePaths.has(sp)) {
    sitemapOrphans.push({
      path: sp,
      canonicalUrl: BASE_URL + sp,
      pageName: deriveName(sp),
      status: 'Redirect',
      sourceFile: 'app/sitemap.ts',
      note: 'declared in sitemap.ts - no matching app/ route',
    });
  }
}

// 3. Grep nav components for internal hrefs

const NAV_FILES = [
  'components/layout/TopNav.tsx',
  'components/layout/Footer.tsx',
  'components/layout/MenuDropdown.tsx',
];

const hrefRe = /href=["']([^"']+)["']/g;

const navInternalLinks = new Set();
for (const relPath of NAV_FILES) {
  const fullPath = join(ROOT, relPath);
  let text = '';
  try {
    text = readFileSync(fullPath, 'utf8');
  } catch (e) {
    console.warn('[extract-routes] Could not read ' + relPath);
    continue;
  }

  let hm;
  while ((hm = hrefRe.exec(text)) !== null) {
    const href = hm[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      navInternalLinks.add(href);
    }
  }
}

// Find nav links that don't correspond to any app/ route
const sitemapOrphanPaths = new Set(sitemapOrphans.map(function(o) { return o.path; }));
const navOrphans = [];
for (const href of navInternalLinks) {
  const normalized = href.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (!appRoutePaths.has(normalized) && !appRoutePaths.has(href) && !sitemapOrphanPaths.has(normalized)) {
    navOrphans.push({
      path: href,
      canonicalUrl: BASE_URL + href,
      pageName: deriveName(href),
      status: 'Redirect',
      sourceFile: 'nav-components',
      note: 'orphaned link - no matching route',
    });
  }
}

// 4. Best-effort: Sanity program slugs
// Note: Sanity MCP query_documents not available in Node CLI context.
// The orchestrator can supplement via Sanity MCP separately.
// Known excluded slugs from sitemap.ts: back-2-school, fire-relief (have dedicated pages).
console.log('[extract-routes] Sanity program slug fetch: skipped in CLI context - dynamic routes captured as /our-programs/[slug]');

// 5. Assemble final route list

const routes = [
  ...appRoutes,
  ...sitemapOrphans,
  ...navOrphans,
];

// De-duplicate by path
const seenPaths = new Set();
const deduped = routes.filter(function(r) {
  if (seenPaths.has(r.path)) return false;
  seenPaths.add(r.path);
  return true;
});

// 6. Write lib/routes.json

const outPath = join(ROOT, 'lib', 'routes.json');
writeFileSync(outPath, JSON.stringify(deduped, null, 2));

console.log('[extract-routes] Wrote ' + deduped.length + ' routes to lib/routes.json');
console.log('  Live routes (app/ pages): ' + appRoutes.length);
console.log('  Sitemap-only orphans: ' + sitemapOrphans.length);
console.log('  Nav-only orphans: ' + navOrphans.length);

for (const r of deduped) {
  const flag = r.status === 'Redirect' ? ' [ORPHAN]' : '';
  const note = r.note ? ' - ' + r.note : '';
  console.log('  ' + r.status.padEnd(8) + ' ' + r.path + flag + note);
}
