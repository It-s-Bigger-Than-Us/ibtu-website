import { chromium } from 'playwright';
const SC = process.argv[2] || 'scripts/design-audit/out';
const BASE = (process.env.AUDIT_BASE || 'https://ibtu.la').replace(/\/$/, '');
const pages = ['fire','b2s','school','coastal','food','about','impact','our-programs'];
const browser = await chromium.launch();
const ctx = await browser.newContext({viewport:{width:1440,height:900}});
const out={};
for (const p of pages) {
  const page = await ctx.newPage();
  await page.addInitScript(()=>{ try{ localStorage.setItem('ibtu_newsletter_prompt_v1', JSON.stringify({status:'dismissed', ts: Date.now()})); }catch(e){} });
  try {
    const r = await page.goto(`${BASE}/${p}`,{waitUntil:'load',timeout:60000});
    await page.waitForTimeout(1500);
    const h = await page.evaluate(()=>document.body.scrollHeight);
    for (let y=0;y<h;y+=700){ await page.evaluate(v=>window.scrollTo(0,v), y); await page.waitForTimeout(120);}
    await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(900);
    await page.screenshot({path:`${SC}/shots/prog-${p}.png`, fullPage:true});
    out[p] = await page.evaluate(()=>({
      status: document.title, height: document.body.scrollHeight,
      sections: document.querySelectorAll('section').length,
      images: document.querySelectorAll('img').length, videos: document.querySelectorAll('video').length,
      h1: document.querySelector('h1')?.textContent.trim().slice(0,60),
      h2s: [...document.querySelectorAll('h2')].map(h=>h.textContent.trim().replace(/\s+/g,' ').slice(0,40)),
      bgs: [...new Set([...document.querySelectorAll('section')].map(s=>getComputedStyle(s).backgroundColor))],
    }));
    out[p].http = r?.status();
  } catch(e){ out[p]={error:String(e).slice(0,120)}; }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(out,null,1));
