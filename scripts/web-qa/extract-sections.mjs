/**
 * extract-sections.mjs
 * Cartographer - Section Component Inventory
 *
 * Walks components/sections/ (ignoring .stories.tsx) and for each component:
 *   - Extracts component name, file path
 *   - Finds visible copy (string literals in JSX text positions, or marks as dynamic)
 *   - Finds CTA labels + targets
 *   - Best-effort maps each section to the routes that import it
 *
 * Usage: node scripts/web-qa/extract-sections.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// ── Helpers ────────────────────────────────────────────────────────────────

function walkDir(dir, ext) {
  ext = ext || '.tsx';
  const results = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (e) {
    return results;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch (e) {
      continue;
    }
    if (stat.isDirectory()) {
      results.push(...walkDir(full, ext));
    } else if (full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Derive the exported component name from a file.
 * Prefers "export default function Foo" or "export default function" patterns.
 */
function extractComponentName(text, filePath) {
  const defFnMatch = text.match(/export\s+default\s+function\s+([A-Z][A-Za-z0-9]*)/);
  if (defFnMatch) return defFnMatch[1];

  // Arrow component assigned to const
  const arrowMatch = text.match(/export\s+default\s+([A-Z][A-Za-z0-9]*)/);
  if (arrowMatch) return arrowMatch[1];

  // Fall back to filename
  return basename(filePath, '.tsx');
}

/**
 * Extract visible copy from the component source.
 * Strategy:
 *   1. Find JSX string literals that look like headlines or body copy
 *      (quoted strings inside JSX, or text content between tags)
 *   2. Find default prop values (headline/body/title/description strings)
 *   3. If none found but there are props, mark as dynamic
 */
function extractCopy(text) {
  const candidates = [];

  // Default prop values for headline/body/title/description (common in CTA-style components)
  const defaultPropRe = /(?:headline|body|title|description|label|copy|eyebrow)\s*=\s*['"]([^'"]{8,})['"]/gi;
  let m;
  while ((m = defaultPropRe.exec(text)) !== null) {
    candidates.push(m[1].trim());
  }

  // String constants that look like display copy (not imports, paths, classnames)
  // Match: strings >= 8 chars that start with a capital letter or quote
  const jsxStringRe = />\s*([A-Z][^<"'\n\r]{7,})\s*</g;
  while ((m = jsxStringRe.exec(text)) !== null) {
    const s = m[1].trim();
    // Filter out things that look like code/paths/CSS
    if (
      s.length < 8 ||
      s.includes('{') ||
      s.includes('(') ||
      s.includes(':') ||
      s.startsWith('/') ||
      s.startsWith('.') ||
      s.startsWith('var(')
    ) continue;
    candidates.push(s);
  }

  if (candidates.length === 0) {
    // Check if component accepts content via props/children
    const hasProps = /interface\s+\w+Props|props:\s*\{|:\s*\{[^}]*title|:\s*\{[^}]*children/.test(text);
    return hasProps ? 'dynamic - from CMS/props' : 'dynamic - from CMS/props';
  }

  // Dedupe and take first 3 most meaningful snippets
  const unique = [...new Set(candidates)].slice(0, 3);
  return unique.join(' | ');
}

/**
 * Extract CTA labels and targets from Link/a/button elements.
 */
function extractCTA(text) {
  const ctas = [];

  // <Link href="/...">Label</Link> or <a href="...">Label</a>
  // Pattern: href="..." ... >LABEL</  (capturing across possible attributes)
  const linkRe = /href=["']([^"']+)["'][^>]*>\s*([A-Za-z][^<\n]{2,40})\s*</g;
  let m;
  while ((m = linkRe.exec(text)) !== null) {
    const href = m[1].trim();
    const label = m[2].trim().replace(/\s+/g, ' ');
    // Skip external social links and asset paths
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.endsWith('.svg') || href.endsWith('.png')) continue;
    if (label.length < 2 || label.includes('{')) continue;
    ctas.push({ label: label, target: href });
  }

  // Button text - <button...>Label</button>
  const buttonRe = /<button[^>]*>\s*([A-Za-z][^<\n]{2,40})\s*<\/button>/g;
  while ((m = buttonRe.exec(text)) !== null) {
    const label = m[1].trim().replace(/\s+/g, ' ');
    if (label.length >= 2 && !label.includes('{')) {
      ctas.push({ label: label, target: 'onClick' });
    }
  }

  return ctas;
}

/**
 * Find which routes import this section component.
 */
function findRouteImporters(componentName, allPageFiles, allClientComponents) {
  const routes = new Set();
  const importPattern = new RegExp(componentName + '[\'"]?\\s*(?:from|>|;|,|\\n)');

  for (const { route, text } of allPageFiles) {
    if (importPattern.test(text)) {
      routes.add(route);
    }
  }
  for (const { route, text } of allClientComponents) {
    if (importPattern.test(text)) {
      routes.add(route);
    }
  }

  return routes.size > 0 ? [...routes].join(', ') : 'unmapped';
}

// ── Gather page files for importer mapping ─────────────────────────────────

const appDir = join(ROOT, 'app');

function deriveRoute(absPath) {
  const rel = relative(appDir, absPath);
  const segments = rel.split('/').slice(0, -1);
  const filtered = segments.filter(function(seg) {
    return !(seg.startsWith('(') && seg.endsWith(')'));
  });
  if (filtered.length === 0) return '/';
  return '/' + filtered.join('/');
}

// Collect all page.tsx and client component files in app/
const allTsxInApp = walkDir(appDir);
const pageFileObjects = allTsxInApp
  .filter(function(f) { return f.endsWith('page.tsx') || f.endsWith('Client.tsx') || f.endsWith('layout.tsx'); })
  .map(function(f) {
    let text = '';
    try { text = readFileSync(f, 'utf8'); } catch (e) { /* ignore */ }
    return { route: deriveRoute(f), text: text, file: f };
  });

// Also grab non-page .tsx files in app/ (like AboutClient.tsx)
const clientComponentObjects = allTsxInApp
  .filter(function(f) { return !f.endsWith('page.tsx') && !f.endsWith('layout.tsx'); })
  .map(function(f) {
    let text = '';
    try { text = readFileSync(f, 'utf8'); } catch (e) { /* ignore */ }
    const relDir = relative(appDir, dirname(f));
    const segments = relDir.split('/').filter(Boolean).filter(function(seg) {
      return !(seg.startsWith('(') && seg.endsWith(')'));
    });
    const route = segments.length === 0 ? '/' : '/' + segments.join('/');
    return { route: route, text: text, file: f };
  });

// ── Main: walk sections ────────────────────────────────────────────────────

const sectionsDir = join(ROOT, 'components', 'sections');
const sectionFiles = walkDir(sectionsDir).filter(function(f) {
  return f.endsWith('.tsx') && !f.endsWith('.stories.tsx');
});

const sections = [];

for (const file of sectionFiles) {
  let text = '';
  try {
    text = readFileSync(file, 'utf8');
  } catch (e) {
    console.warn('[extract-sections] Could not read ' + file);
    continue;
  }

  const componentName = extractComponentName(text, file);
  const copy = extractCopy(text);
  const ctas = extractCTA(text);
  const routeStr = findRouteImporters(componentName, pageFileObjects, clientComponentObjects);

  const entry = {
    section: componentName,
    componentFile: 'components/sections/' + basename(file),
    route: routeStr,
    copy: copy,
    ctaLabel: ctas.length > 0 ? ctas[0].label : '',
    ctaTarget: ctas.length > 0 ? ctas[0].target : '',
  };

  // Note additional CTAs if more than one
  if (ctas.length > 1) {
    entry.additionalCTAs = ctas.slice(1).map(function(c) { return c.label + ' -> ' + c.target; });
  }

  sections.push(entry);
  console.log('[extract-sections] ' + componentName + ' -> route: ' + routeStr);
}

console.log('\n[extract-sections] Total: ' + sections.length + ' section components');

// Output as JSON to stdout as well
console.log('\n--- SECTIONS JSON ---');
console.log(JSON.stringify(sections, null, 2));
