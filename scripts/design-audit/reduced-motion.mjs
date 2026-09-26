import { chromium } from 'playwright';
// Usage: AUDIT_BASE=http://localhost:3112 node scripts/design-audit/reduced-motion.mjs
// Proves the hero's prefers-reduced-motion path (finding 09): jumps straight
// to the resting frame, video stays paused on its first frame, and every
// ambient loop is stopped for real (document.getAnimations() has nothing
// running) — both at rest and after a scroll round trip. Also proves the
// default (motion-on) path still works, and that offscreen ambient elements
// pick up data-offscreen after a scroll.
const BASE = (process.env.AUDIT_BASE || 'http://localhost:3112').replace(/\/$/, '');
let pass = true;
const ok = (label, cond) => { console.log(`${cond ? 'PASS' : 'FAIL'} - ${label}`); if (!cond) pass = false; };

const browser = await chromium.launch();

// ─── Reduced-motion context ───
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  const h1State = await page.locator('h1').first().evaluate((el) => ({
    opacity: getComputedStyle(el).opacity,
  })).catch(() => null);
  ok('reduced-motion: resting h1 opacity 1', h1State?.opacity === '1');

  const videoPaused = await page.locator('video').first().evaluate((v) => v.paused).catch(() => null);
  ok('reduced-motion: video paused', videoPaused === true);

  const playBtn = page.locator('button[aria-label="Play video"]').first();
  ok('reduced-motion: "Play video" button visible', await playBtn.isVisible().catch(() => false));

  const heroIntro = await page.evaluate(() => document.documentElement.dataset.heroIntro).catch(() => null);
  ok('reduced-motion: data-hero-intro done', heroIntro === 'done');

  const runningAt1s = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length).catch(() => -1);
  ok('reduced-motion: 0 running animations at 1s', runningAt1s === 0);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const runningAfterScroll = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length).catch(() => -1);
  ok('reduced-motion: 0 running animations after scroll round trip', runningAfterScroll === 0);

  await ctx.close();
}

// ─── Default (motion-on) context ───
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(6000);

  const h1Opacity = await page.locator('h1').first().evaluate((el) => getComputedStyle(el).opacity).catch(() => null);
  ok('default: resting plate h1 visible after 6s (normal path still works)', h1Opacity === '1');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(600);
  const anyOffscreenAbove = await page.evaluate(() => {
    const els = document.querySelectorAll('.ibtu-ambient, .holo-glass');
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 && el.getAttribute('data-offscreen') === 'true') return true;
    }
    return false;
  }).catch(() => false);
  ok('default: an ambient element above the viewport carries data-offscreen after scrolling to the middle', anyOffscreenAbove);

  await ctx.close();
}

await browser.close();
console.log(pass ? '\nALL PASS' : '\nSOME FAILED');
process.exit(pass ? 0 : 1);
