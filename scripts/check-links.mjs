/**
 * check-links.mjs
 * Cartographer - Build-time internal link guard
 *
 * Pure export: findBrokenLinks(links, routes)
 * CLI main(): greps app/ + components/ for internal hrefs, loads lib/routes.json,
 *   prints offenders, exits 1 if any found.
 *
 * Usage: node scripts/check-links.mjs
 *
 * Known, accepted trade-off (per Codex QA gate 2026-06-01): a link to a dynamic
 * route like /our-programs/<slug> matches the [slug] pattern for ANY slug, even
 * one the page would notFound() at runtime. routes.json enumerates the real
 * concrete slugs as Live, but the broad [slug] pattern is kept so newly-added
 * Sanity programs don't false-fail the build before a re-sync. Net: this guard
 * catches broken STATIC/literal links (its purpose); typo'd dynamic slugs are
 * handled by the runtime notFound(), not the build.
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
  // Build matchers that honor Next.js dynamic-route semantics:
  //   [slug]        → exactly one path segment
  //   [...slug]     → one or more segments
  //   [[...slug]]   → zero or more segments (the base path also matches)
  const matchers = routes
    .map((r) => ({ path: r.path, status: r.status, re: routeToRegex(r.path), spec: specificity(r.path) }))
    // Most-specific (static) routes first so a literal match wins its status
    // over an overlapping dynamic pattern.
    .sort((a, b) => a.spec - b.spec);

  const offenders = [];
  for (const link of links) {
    const href = normalizeHref(link.href);
    if (href === null) continue; // external / non-internal — not our concern
    const match = matchers.find((m) => m.re.test(href));
    if (!match) {
      offenders.push({ file: link.file, href: link.href, reason: 'unknown' });
    } else if (match.status === 'Retired') {
      offenders.push({ file: link.file, href: link.href, reason: 'retired' });
    }
    // 'Live' and 'Redirect' are OK
  }
  return offenders;
}

/** Normalize an internal href: drop query/hash, collapse trailing slash. Returns null for external links. */
export function normalizeHref(href) {
  if (typeof href !== 'string' || !href.startsWith('/')) return null;
  let p = href.split('#')[0].split('?')[0];
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

/** Lower = more specific. Static segments score 0; dynamic 1; catch-all 2. */
function specificity(path) {
  return path
    .split('/')
    .filter(Boolean)
    .reduce((n, seg) => n + (/^\[\[?\.\.\./.test(seg) ? 2 : /^\[.+\]$/.test(seg) ? 1 : 0), 0);
}

/** Convert a Next.js route path into an anchored RegExp. */
export function routeToRegex(path) {
  const segs = path.split('/').filter(Boolean);
  // Root-level optional catch-all (e.g. "/[[...slug]]") must also match "/".
  if (segs.length === 1 && /^\[\[\.\.\..+\]\]$/.test(segs[0])) {
    return /^\/?(?:[^/]+(?:\/[^/]+)*)?$/;
  }
  let re = '^';
  for (const seg of segs) {
    if (/^\[\[\.\.\..+\]\]$/.test(seg)) {
      re += '(?:/[^/]+)*'; // optional catch-all: zero or more
    } else if (/^\[\.\.\..+\]$/.test(seg)) {
      re += '(?:/[^/]+)+'; // catch-all: one or more
    } else if (/^\[.+\]$/.test(seg)) {
      re += '/[^/]+'; // dynamic single segment
    } else {
      re += '/' + seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  }
  if (segs.length === 0) re += '/'; // root "/"
  re += '$';
  return new RegExp(re);
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
