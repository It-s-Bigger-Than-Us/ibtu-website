import { chromium, devices } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
// Usage: AUDIT_BASE=http://localhost:3100 node scripts/design-audit/audit.mjs <outDir> [--assert]
// Writes <outDir>/audit.json and <outDir>/shots/*.png. --assert exits 1 on any lowContrast pair.
const SC = process.argv[2] || 'scripts/design-audit/out';
const ASSERT = process.argv.includes('--assert');
const BASE = (process.env.AUDIT_BASE || 'https://ibtu.la').replace(/\/$/, '');
mkdirSync(`${SC}/shots`, { recursive: true });
const pages = [
  ['home', `${BASE}/`],
  ['programs', `${BASE}/our-programs`],
  ['get-involved', `${BASE}/get-involved`],
  ['events', `${BASE}/events`],
];
const browser = await chromium.launch();
const results = {};
async function dismiss(page){
  for (const sel of ['button:has-text("No thanks")','.ibtu-newsletter-close','button[aria-label*="lose"]']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({timeout:1500})) { await b.click(); await page.waitForTimeout(400);} } catch {}
  }
}
async function scrollAll(page){
  const h = await page.evaluate(()=>document.body.scrollHeight);
  for (let y=0;y<h;y+=600){ await page.evaluate(v=>window.scrollTo(0,v), y); await page.waitForTimeout(120);}
  await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(800);
}
const auditFn = () => {
  const lum = c => { const [r,g,b]=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}); return 0.2126*r+0.7152*g+0.0722*b; };
  const parse = s => { const m = s && s.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(',').map(Number); return {rgb:p.slice(0,3), a:p.length>3?p[3]:1}; };
  const contrast=(f,b)=>{const l1=lum(f),l2=lum(b);return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)};
  const bgOf = el => { let e=el; while(e){ const c=parse(getComputedStyle(e).backgroundColor); if(c && c.a>0.9) return c.rgb; e=e.parentElement;} return [0,0,0]; };
  const out = { fontSizes:{}, fontFamilies:{}, weights:{}, colors:{}, lowContrast:[], smallText:[], smallTargets:[], headings:[], images:{total:0,noAlt:0}, buttonsNoName:0, focusVisibleMissing:0, ticker:0 };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode; const txt=t.textContent.trim(); if(!txt || txt.length<2) continue;
    const el = t.parentElement; if(!el || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el); if (cs.display==='none'||cs.visibility==='hidden') continue;
    const r = el.getBoundingClientRect(); if (r.width===0||r.height===0) continue;
    const fs = Math.round(parseFloat(cs.fontSize)); out.fontSizes[fs]=(out.fontSizes[fs]||0)+1;
    const ff = cs.fontFamily.split(',')[0].replace(/['"]/g,''); out.fontFamilies[ff]=(out.fontFamilies[ff]||0)+1;
    out.weights[cs.fontWeight]=(out.weights[cs.fontWeight]||0)+1;
    out.colors[cs.color]=(out.colors[cs.color]||0)+1;
    if (fs < 12) out.smallText.push({txt:txt.slice(0,40), fs, cls:el.className&&el.className.toString().slice(0,40)});
    const fg = parse(cs.color); if (fg && cs.webkitTextFillColor!=='rgba(0, 0, 0, 0)') { const bg=bgOf(el); const c=contrast(fg.rgb,bg); const large = fs>=24 || (fs>=18.66 && parseInt(cs.fontWeight)>=700); if (c < (large?3:4.5)) out.lowContrast.push({txt:txt.slice(0,40), fs, fg:cs.color, bg:`rgb(${bg})`, ratio:+c.toFixed(2)}); }
  }
  document.querySelectorAll('a,button,[role=button],input,select,textarea').forEach(el=>{ const r=el.getBoundingClientRect(); const cs=getComputedStyle(el); if(r.width===0||cs.display==='none') return; if(r.width<24||r.height<24) out.smallTargets.push({tag:el.tagName, name:(el.getAttribute('aria-label')||el.textContent||'').trim().slice(0,30), w:Math.round(r.width), h:Math.round(r.height)}); if(el.tagName==='BUTTON'||el.tagName==='A'){ const name=(el.getAttribute('aria-label')||el.textContent||el.getAttribute('title')||'').trim(); if(!name && !el.querySelector('img[alt]')) out.buttonsNoName++; } });
  document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>out.headings.push(h.tagName+': '+h.textContent.trim().replace(/\s+/g,' ').slice(0,50)));
  document.querySelectorAll('img').forEach(i=>{out.images.total++; if(!i.hasAttribute('alt')) out.images.noAlt++;});
  out.h1count = document.querySelectorAll('h1').length;
  out.counts = { smallText: out.smallText.length, smallTargets: out.smallTargets.length, lowContrast: out.lowContrast.length };
  out.lowContrast = out.lowContrast.slice(0,25); out.smallText = out.smallText.slice(0,25); out.smallTargets=out.smallTargets.slice(0,25);
  out.pageHeight = document.body.scrollHeight;
  out.animated = document.getAnimations ? document.getAnimations().length : null;
  out.hasSkipLink = !!document.querySelector('.skip-to-content, a[href="#main"], a[href="#content"]');
  out.landmarks = {main:document.querySelectorAll('main').length, nav:document.querySelectorAll('nav').length, footer:document.querySelectorAll('footer').length};
  return out;
};
for (const [name,url] of pages) {
  for (const [vp, opts] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',{...devices['iPhone 13'], viewport:{width:390,height:844}}]]) {
    const ctx = await browser.newContext(opts); const page = await ctx.newPage();
    try {
      await page.goto(url,{waitUntil:'networkidle',timeout:45000});
      await page.waitForTimeout(1500);
      if (name==='home' && vp==='desktop') await page.screenshot({path:`${SC}/shots/home-desktop-modal.jpg`, type:'jpeg', quality:60});
      await dismiss(page);
      await scrollAll(page);
      await page.screenshot({path:`${SC}/shots/${name}-${vp}-top.jpg`, type:'jpeg', quality:60});
      await page.screenshot({path:`${SC}/shots/${name}-${vp}-full.jpg`, type:'jpeg', quality:60, fullPage:true});
      results[`${name}-${vp}`] = await page.evaluate(auditFn);
      // focus test: tab 6 times and see if focus is visible
      if (vp==='desktop') { let visibleFocus=0; for(let i=0;i<8;i++){ await page.keyboard.press('Tab'); const r = await page.evaluate(()=>{const e=document.activeElement; if(!e||e===document.body) return null; const cs=getComputedStyle(e); return {tag:e.tagName, name:(e.getAttribute('aria-label')||e.textContent||'').trim().slice(0,25), outline:cs.outlineStyle+' '+cs.outlineWidth+' '+cs.outlineColor, shadow:cs.boxShadow.slice(0,40)}}); if(r && !(r.outline.startsWith('none') && r.shadow==='none')) visibleFocus++; if(i===2) await page.screenshot({path:`${SC}/shots/${name}-focus.jpg`, type:'jpeg', quality:60}); } results[`${name}-${vp}`].focusVisibleOf8 = visibleFocus; }
    } catch(e){ results[`${name}-${vp}`]={error:String(e).slice(0,200)}; }
    await ctx.close();
  }
}
// /programs must resolve (redirect to /our-programs), never 404
{
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  try { const r = await page.goto(`${BASE}/programs`, { waitUntil: 'commit', timeout: 30000 }); results.programsRedirect = { status: r?.status(), finalUrl: page.url() }; }
  catch (e) { results.programsRedirect = { error: String(e).slice(0,120) }; }
  await ctx.close();
}
await browser.close();
// Summary table: one row per page/viewport
results.summary = {};
for (const [k, v] of Object.entries(results)) {
  if (!v || !v.counts) continue;
  results.summary[k] = { smallText: v.counts.smallText, smallTargets: v.counts.smallTargets, lowContrast: v.counts.lowContrast, animated: v.animated, focusVisibleOf8: v.focusVisibleOf8 ?? null, pageHeight: v.pageHeight, imagesNoAlt: v.images?.noAlt ?? null };
}
writeFileSync(`${SC}/audit.json`, JSON.stringify(results, null, 1));
console.table(results.summary);
console.log('programsRedirect', JSON.stringify(results.programsRedirect));
const lowContrastTotal = Object.values(results.summary).reduce((a, r) => a + (r.lowContrast || 0), 0);
if (ASSERT && lowContrastTotal > 0) { console.error(`CONTRAST ASSERTION FAILED: ${lowContrastTotal} text/background pairs below WCAG ratio`); process.exit(1); }
