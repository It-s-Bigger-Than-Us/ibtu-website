import { chromium, devices } from 'playwright';
const SC = process.argv[2] || 'scripts/design-audit/out';
const BASE = (process.env.AUDIT_BASE || 'https://ibtu.la').replace(/\/$/, '');
const browser = await chromium.launch();
async function dismiss(page){ for (const sel of ['button:has-text("No thanks")','.ibtu-newsletter-close']) { try { const b=page.locator(sel).first(); if (await b.isVisible({timeout:1200})) { await b.click(); await page.waitForTimeout(300);} } catch {} } }
async function scrollAll(page){ const h=await page.evaluate(()=>document.body.scrollHeight); for(let y=0;y<h;y+=600){ await page.evaluate(v=>window.scrollTo(0,v),y); await page.waitForTimeout(150);} }
async function shotSection(page, text, file, pad=0){ const h=page.locator(`h1:has-text("${text}"), h2:has-text("${text}")`).first(); await h.scrollIntoViewIfNeeded(); await page.waitForTimeout(1800); const sec=h.locator('xpath=ancestor::section[1]'); const target=(await sec.count())?sec:h; await target.screenshot({path:`${SC}/shots/${file}`}); }
const ctxOpts = o => ({...o}); async function prep(page){ await page.addInitScript(()=>{ try{ localStorage.setItem('ibtu_newsletter_prompt_v1', JSON.stringify({status:'dismissed', ts: Date.now()})); }catch(e){} }); }
const out={};
// desktop
let ctx=await browser.newContext({viewport:{width:1440,height:900}}); let page=await ctx.newPage(); await prep(page); await prep(page);
await page.goto('${BASE}/',{waitUntil:'load',timeout:60000}); await page.waitForTimeout(1200); await dismiss(page); await scrollAll(page);
await page.locator('nav[aria-label="Primary"]').screenshot({path:`${SC}/shots/crop-nav.png`});
await shotSection(page,'By the Numbers','crop-numbers-desktop.png');
await shotSection(page,'Our Impact Pillars','crop-pillars-desktop.png');
await shotSection(page,'Our Programs','crop-programs-desktop.png');
await shotSection(page,'When Systems Fail','crop-mission-desktop.png');
await page.locator('footer').first().screenshot({path:`${SC}/shots/crop-footer-desktop.png`});
// hero: what's in the H1
out.h1html = await page.evaluate(()=>{const h=document.querySelector('h1'); return {html:h.outerHTML.slice(0,600), text:h.textContent, visible: getComputedStyle(h).opacity+' '+getComputedStyle(h).visibility, rect: JSON.stringify(h.getBoundingClientRect())}});
await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(6000); await page.screenshot({path:`${SC}/shots/home-hero-6s.png`});
// sample colors of gold heading over sky
out.samples = await page.evaluate(()=>{ const h=[...document.querySelectorAll('h2')].find(e=>/By the Numbers/i.test(e.textContent)); const r=h.getBoundingClientRect(); return {headingColor:getComputedStyle(h).color, bgImage: (()=>{let e=h; while(e){const cs=getComputedStyle(e); if(cs.backgroundImage!=='none') return cs.backgroundImage.slice(0,120); const img=e.querySelector(':scope > img, :scope > video'); if(img) return img.tagName+' '+(img.currentSrc||img.src||'').slice(0,100); e=e.parentElement;} return null;})()} });
await ctx.close();
// events desktop crops
ctx=await browser.newContext({viewport:{width:1440,height:900}}); page=await ctx.newPage(); await prep(page);
await page.goto('${BASE}/events',{waitUntil:'load',timeout:60000}); await page.waitForTimeout(1200); await dismiss(page); await scrollAll(page);
await shotSection(page,'What','crop-events-hero.png');
await shotSection(page,'October 2026','crop-events-month.png');
await ctx.close();
// get involved
ctx=await browser.newContext({viewport:{width:1440,height:900}}); page=await ctx.newPage(); await prep(page);
await page.goto('${BASE}/get-involved',{waitUntil:'load',timeout:60000}); await page.waitForTimeout(1200); await dismiss(page); await scrollAll(page);
await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(2500); await page.screenshot({path:`${SC}/shots/crop-gi-hero.png`});
await shotSection(page,'Show Up','crop-gi-embed.png');
out.iframes = await page.evaluate(()=>[...document.querySelectorAll('iframe')].map(i=>({src:(i.src||'').slice(0,100), h:i.getBoundingClientRect().height})));
await ctx.close();
// mobile crops
ctx=await browser.newContext({...devices['iPhone 13'], viewport:{width:390,height:844}}); page=await ctx.newPage(); await prep(page);
await page.goto('${BASE}/',{waitUntil:'load',timeout:60000}); await page.waitForTimeout(1200); await page.screenshot({path:`${SC}/shots/crop-mobile-modal.png`}); await dismiss(page); await scrollAll(page);
await shotSection(page,'By the Numbers','crop-numbers-mobile.png');
await shotSection(page,'Our Impact Pillars','crop-pillars-mobile.png');
await shotSection(page,'Our Programs','crop-programs-mobile.png');
await page.locator('footer').first().screenshot({path:`${SC}/shots/crop-footer-mobile.png`});
await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(500);
await page.locator('nav[aria-label="Primary"] button').first().click().catch(()=>{}); await page.waitForTimeout(800); await page.screenshot({path:`${SC}/shots/crop-mobile-menu.png`});
await ctx.close();
await browser.close();
console.log(JSON.stringify(out,null,1));
