// Usage: AUDIT_BASE=http://localhost:3108 node scripts/design-audit/carousel-check.mjs
// Phone proof for finding 11: carousel labels never crop, pillar tabs wrap.
import { chromium } from 'playwright';
const BASE = (process.env.AUDIT_BASE || 'http://localhost:3100').replace(/\/$/, '');
const SC = 'scripts/design-audit/after/I/shots';
const VW = 390;
let ok = true;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: 844 } });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 45000 });

async function dismissNewsletter() {
  for (const sel of ['.ibtu-newsletter-close', 'button[aria-label*="lose"]']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1000 })) { await b.click(); await page.waitForTimeout(300); } } catch {}
  }
}

async function checkLabels(shotName) {
  await dismissNewsletter();
  await page.getByText('Our Programs', { exact: true }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${SC}/${shotName}`, type: 'jpeg', quality: 70 });
  const labels = await page.locator('section:has-text("Our Programs") h3').all();
  for (const el of labels) {
    const box = await el.boundingBox();
    if (!box) continue;
    const onScreen = box.x + box.width > 0 && box.x < VW; // card scrolled into view
    if (!onScreen) continue; // off-track cards aren't "visible", skip
    if (box.x < -0.5 || box.x + box.width > VW + 0.5) {
      ok = false;
      console.log('FAIL cropped label at x=', box.x, 'w=', box.width);
    }
  }
}

await checkLabels('carousel-mobile.jpg');
await dismissNewsletter();
const next = page.getByRole('button', { name: 'Next programs' });
await next.click();
await page.waitForTimeout(500);
await checkLabels('carousel-mobile.jpg');

await dismissNewsletter();
await page.getByText('Our Impact Pillars', { exact: true }).scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: `${SC}/pillar-tabs-mobile.jpg`, type: 'jpeg', quality: 70 });
const tabs = await page.getByRole('button', { name: /Stabilization|Stability|Resource Access/ }).all();
if (tabs.length < 3) { ok = false; console.log('FAIL expected 3 pillar tabs, found', tabs.length); }
for (const el of tabs) {
  const box = await el.boundingBox();
  if (!box || box.x < -0.5 || box.x + box.width > VW + 0.5) {
    ok = false;
    console.log('FAIL pillar tab outside viewport', box);
  }
}

await browser.close();
console.log(ok ? 'PASS' : 'FAIL');
process.exit(ok ? 0 : 1);
