/**
 * check-links.mjs
 * Cartographer - Build-time internal link guard
 *
 * Pure export: findBrokenLinks(links, routes)
 * CLI main(): greps app/ + components/ for internal hrefs, loads lib/routes.json,
 *   prints offenders, exits 1 if any found.
 *
 * Usage: node scripts/check-links.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Pure exported function ─────────────────────────────────────────────────

/**
 * findBrokenLinks(links, routes)
 *
 * @param {Array<{file: string, href: string}>} links
 * @param {Array<{path: string, status: string}>} routes
 * @returns {Array<{file: string, href: string, reason: 'retired'|'unknown'}>}
 */
export function findBrokenLinks(links, routes) {
  const routeMap = new Map();
  for (const r of routes) {
    routeMap.set(r.path, r.status);
  }

  const offenders = [];
  for (const link of links) {
    const status = routeMap.get(link.href);
    if (status === 'Retired') {
      offenders.push({ file: link.file, href: link.href, reason: 'retired' });
    } else if (status === undefined) {
      offenders.push({ file: link.file, href: link.href, reason: 'unknown' });
    }
    // 'Live' and 'Redirect' are OK
  }
  return offenders;
}

// ── CLI main ───────────────────────────────────────────────────────────────

function walkDir(dir, exts) {
  exts = exts || ['.tsx', '.ts', '.jsx', '.js', '.mjs'];
  const results = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (e) {
    return results;
  }
  for (const entry of entries) {
    // Skip node_modules and .next build dirs
    if (entry === 'node_modules' || entry === '.next' || entry === '.git') continue;
    const full = join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch (e) {
      continue;
    }
    if (stat.isDirectory()) {
      results.push(...walkDir(full, exts));
    } else if (exts.some(function(e) { return full.endsWith(e); })) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract all internal hrefs from a file's source text.
 * Matches:
 *   href="/..."
 *   href='/...'
 *   href={"/..."}
 *   href={'/...'}
 *   <Link href="/...">
 */
function extractInternalLinks(text, filePath) {
  const links = [];

  // href="/.." or href='/..'  — use RegExp() to avoid confusing Vite's regex parser
  const literalRe = new RegExp('href=["\'](\\/[^"\'?#]*)', 'g');
  let m;
  while ((m = literalRe.exec(text)) !== null) {
    const href = m[1];
    links.push({ file: filePath, href: href });
  }

  // href={"/..."} or href={'/...'}
  const exprRe = new RegExp('href=\\{["\'](\\/[^"\'?#]*)', 'g');
  while ((m = exprRe.exec(text)) !== null) {
    const href = m[1];
    links.push({ file: filePath, href: href });
  }

  return links;
}

async function main() {
  // Load routes
  const routesPath = join(ROOT, 'lib', 'routes.json');
  let routes = [];
  try {
    routes = JSON.parse(readFileSync(routesPath, 'utf8'));
  } catch (e) {
    console.error('[check-links] Could not load lib/routes.json - run extract-routes.mjs first');
    process.exit(1);
  }

  // Collect all source files in app/ and components/
  const searchDirs = [
    join(ROOT, 'app'),
    join(ROOT, 'components'),
  ];

  const allLinks = [];
  for (const dir of searchDirs) {
    const files = walkDir(dir);
    for (const file of files) {
      let text = '';
      try {
        text = readFileSync(file, 'utf8');
      } catch (e) {
        continue;
      }
      const relFile = relative(ROOT, file);
      const fileLinks = extractInternalLinks(text, relFile);
      allLinks.push(...fileLinks);
    }
  }

  console.log('[check-links] Scanned ' + allLinks.length + ' internal hrefs across app/ + components/');

  // Find broken links
  const offenders = findBrokenLinks(allLinks, routes);

  if (offenders.length === 0) {
    console.log('[check-links] All internal links OK.');
    process.exit(0);
  }

  console.error('[check-links] ' + offenders.length + ' broken internal link(s) found:');
  for (const o of offenders) {
    console.error('  [' + o.reason.toUpperCase() + '] ' + o.href + '  in  ' + o.file);
  }
  process.exit(1);
}

// Run main only when invoked directly (not imported by tests)
const isMain = process.argv[1] && process.argv[1].endsWith('check-links.mjs');
if (isMain) {
  main().catch(function(err) {
    console.error(err);
    process.exit(1);
  });
}
