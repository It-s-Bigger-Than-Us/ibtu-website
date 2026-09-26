import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
// Usage: AUDIT_BASE=http://localhost:3109 node scripts/design-audit/embed-fallback.mjs <outDir>
const OUT = process.argv[2] || 'scripts/design-audit/after/J';
const BASE = (process.env.AUDIT_BASE || 'http://localhost:3109').replace(/\/$/, '');
mkdirSync(`${OUT}/shots`, { recursive: true });
const browser = await chromium.launch();

// (a) normal load: embed loads, heading + iframe visible.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/get-involved`, { waitUntil: 'networkidle' });
const iframe = page.locator('iframe[title="IBTU Volunteer Opportunities"]');
await iframe.waitFor({ state: 'attached' });
await page.waitForFunction((el) => el && getComputedStyle(el).opacity === '1', await iframe.elementHandle());
const heading = page.getByText('Open shifts', { exact: true });
const okA = (await heading.isVisible()) && (await iframe.isVisible());
await page.locator('#volunteer').screenshot({ path: `${OUT}/shots/embed-loaded.jpg`, type: 'jpeg', quality: 80 });
console.log(okA ? 'PASS: embed loaded (heading + iframe visible)' : 'FAIL: embed loaded case');
await page.close();

// (b) blocked: volunteer.bloomerang.co fails, fallback renders.
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.route((url) => url.hostname.includes('volunteer.bloomerang.co'), (route) => route.abort());
const page2 = await context.newPage();
await page2.goto(`${BASE}/get-involved`, { waitUntil: 'domcontentloaded' });
const volunteerSection = page2.locator('#volunteer');
const roleCards = volunteerSection.getByText(/^(Hub|School|Coastal Care)$/);
await roleCards.first().waitFor({ state: 'visible', timeout: 16000 });
const fallbackLink = volunteerSection.locator('a[href*="volunteer.bloomerang.co"]');
const okB = (await roleCards.count()) === 3 && (await fallbackLink.isVisible());
await page2.locator('#volunteer').screenshot({ path: `${OUT}/shots/embed-fallback.jpg`, type: 'jpeg', quality: 80 });
console.log(okB ? 'PASS: fallback rendered (3 role cards + join link visible)' : 'FAIL: fallback case');

await browser.close();
process.exit(okA && okB ? 0 : 1);
