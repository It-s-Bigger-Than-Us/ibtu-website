import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
// Usage: AUDIT_BASE=http://localhost:3110 node scripts/design-audit/hero-rest.mjs <outDir>
const OUT = process.argv[2] || 'scripts/design-audit/after/K';
const BASE = (process.env.AUDIT_BASE || 'http://localhost:3110').replace(/\/$/, '');
mkdirSync(`${OUT}/shots`, { recursive: true });
let pass = true;
const ok = (label, cond) => { console.log(`${cond ? 'PASS' : 'FAIL'} - ${label}`); if (!cond) pass = false; };

async function checkViewport(browser, label, width, height, file) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(6000);

  const h1 = page.locator('h1').first();
  const h1Visible = await h1.isVisible().catch(() => false);
  const h1State = await h1.evaluate((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      opacity: cs.opacity,
      visibility: cs.visibility,
      inViewport: r.top >= 0 && r.left >= 0 && r.bottom <= window.innerHeight && r.right <= window.innerWidth,
      text: el.innerText || el.textContent || '',
    };
  }).catch(() => null);

  ok(`${label}: h1 visible`, h1Visible);
  ok(`${label}: h1 opacity 1`, h1State?.opacity === '1');
  ok(`${label}: h1 visibility visible`, h1State?.visibility === 'visible');
  ok(`${label}: h1 inside viewport`, !!h1State?.inViewport);
  ok(`${label}: h1 text contains BIGGER THAN US`, !!h1State?.text?.replace(/\s+/g, ' ').trim().includes('BIGGER THAN US'));

  const heroSection = page.locator('section').first();
  const donate = heroSection.getByText('Donate', { exact: true });
  const getInvolved = heroSection.getByText('Get Involved', { exact: true });
  ok(`${label}: Donate link visible in hero`, await donate.first().isVisible().catch(() => false));
  ok(`${label}: Get Involved link visible in hero`, await getInvolved.first().isVisible().catch(() => false));

  const pauseBtn = page.locator('button[aria-label*="video" i]').first();
  const pauseVisible = await pauseBtn.isVisible().catch(() => false);
  ok(`${label}: pause/play button visible`, pauseVisible);

  if (pauseVisible) {
    await pauseBtn.click();
    await page.waitForTimeout(300);
    const paused = await page.locator('video').first().evaluate((v) => v.paused).catch(() => null);
    ok(`${label}: video paused after click`, paused === true);
  } else {
    ok(`${label}: video paused after click`, false);
  }

  await page.screenshot({ path: `${OUT}/shots/${file}`, type: 'jpeg', quality: 80 });

  // At 20s, plate should still be visible while video plays (assert independent of pause state above)
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(20000);
  const h1At20 = await page.locator('h1').first().evaluate((el) => getComputedStyle(el).opacity).catch(() => null);
  ok(`${label} @20s: plate h1 still visible`, h1At20 === '1');

  await page.close();
}

const browser = await chromium.launch();
await checkViewport(browser, 'desktop', 1440, 900, 'hero-rest-desktop.jpg');
await checkViewport(browser, 'mobile', 390, 844, 'hero-rest-mobile.jpg');
await browser.close();

console.log(pass ? '\nALL PASS' : '\nSOME FAILED');
process.exit(pass ? 0 : 1);
