// Usage: node scripts/design-audit/compare.mjs before/audit.json after/audit.json  → markdown table on stdout
import { readFileSync } from 'node:fs';
const [a, b] = process.argv.slice(2).map(f => JSON.parse(readFileSync(f, 'utf8')));
const metrics = ['smallText', 'smallTargets', 'lowContrast', 'imageGroundSkipped', 'animated', 'animatedRunningInView', 'focusVisibleOf8', 'pageHeight', 'imagesNoAlt'];
console.log('| Page | ' + metrics.map(m => `${m} before → after`).join(' | ') + ' |');
console.log('|---|' + metrics.map(() => '---').join('|') + '|');
for (const k of Object.keys(a.summary || {})) {
  const ra = a.summary[k] || {}, rb = (b.summary || {})[k] || {};
  console.log(`| ${k} | ` + metrics.map(m => `${ra[m] ?? '–'} → ${rb[m] ?? '–'}`).join(' | ') + ' |');
}
console.log(`\n/programs: ${JSON.stringify(a.programsRedirect)} → ${JSON.stringify(b.programsRedirect)}`);
