import { chromium } from 'playwright';
// Usage: AUDIT_BASE=http://localhost:3106 node scripts/design-audit/newsletter-trigger.mjs
// Regression check for polish item G (finding 01): newsletter dialog opens on
// intent, once per session, Home only. Prints PASS/FAIL per case, exits 1 on
// any failure.

const BASE = (process.env.AUDIT_BASE || 'http://localhost:3106').replace(/\/$/, '');
const EYEBROW = 'Stay Close';

async function dialogVisible(page) {
  try {
    return await page.locator(`text=${EYEBROW}`).first().isVisible({ timeout: 500 });
  } catch {
    return false;
  }
}

async function scrollToBottom(page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

async function scrollToPercent(page, pct) {
  await page.evaluate((p) => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.max(0, h * p));
  }, pct);
}

const browser = await chromium.launch();
const results = [];

function record(name, pass, detail) {
  results.push({ name, pass });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
}

// (a) /events, wait 30s, scroll to bottom: no dialog
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${BASE}/events`, { waitUntil: 'load' });
  await page.waitForTimeout(30_000);
  await scrollToBottom(page);
  await page.waitForTimeout(800);
  const visible = await dialogVisible(page);
  record('(a) /events wait+scroll: no dialog', !visible, visible ? 'dialog appeared' : undefined);
  await ctx.close();
}

// (b) /get-involved, wait 30s, scroll to bottom: no dialog
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${BASE}/get-involved`, { waitUntil: 'load' });
  await page.waitForTimeout(30_000);
  await scrollToBottom(page);
  await page.waitForTimeout(800);
  const visible = await dialogVisible(page);
  record('(b) /get-involved wait+scroll: no dialog', !visible, visible ? 'dialog appeared' : undefined);
  await ctx.close();
}

// (c) / (home), wait 30s without scrolling: no dialog (no timer)
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(30_000);
  const visible = await dialogVisible(page);
  record('(c) / wait 30s no scroll: no dialog', !visible, visible ? 'dialog appeared' : undefined);
  await ctx.close();
}

// (d) same context, scroll to 60% of document height on home: dialog opens
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(5_000); // let hero intro finish
  await scrollToPercent(page, 0.65);
  await page.waitForTimeout(1_000);
  const visible = await dialogVisible(page);
  record('(d) scroll to 60% on home: dialog opens', visible);
  await ctx.close();
}

// (e) fresh context: / then /events then back to /: dialog opens once
// (second+ page view); after dismissing, reloading / does not reopen it.
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  await page.goto(`${BASE}/events`, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(5_000); // hero gate + hero-ready poll
  const openedOnce = await dialogVisible(page);
  record('(e) second page view on home: dialog opens', openedOnce);

  if (openedOnce) {
    await page.locator('.ibtu-newsletter-decline').first().click();
    await page.waitForTimeout(300);
  }
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(5_000);
  const reopened = await dialogVisible(page);
  record('(e) reload after dismiss: does not reopen', !reopened, reopened ? 'dialog reappeared' : undefined);
  await ctx.close();
}

await browser.close();

const failed = results.filter((r) => !r.pass);
if (failed.length) {
  console.log(`\n${failed.length} case(s) FAILED`);
  process.exit(1);
} else {
  console.log('\nAll cases PASSED');
}
