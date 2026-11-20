const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
// Read-only browser interactions. Artifacts are confined to this review directory.
(async () => {
 const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const checks=[],errors=[];
 const check=(condition,label)=>{checks.push({label,passed:Boolean(condition)});};
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
  // Load off-screen images for full-page review captures as well as the asset check.
  await page.locator('img').evaluateAll(images=>images.forEach(image=>image.loading='eager'));
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
  check(await page.locator('.platform-row').count()===7,'Seven platform entries');
  check(await page.locator('.platform-row .status.live').count()===1,'Only EndNovel is labelled operational');
  check(await page.evaluate(()=>[...document.images].every(i=>i.naturalWidth>0)),'Original assets load');
  check(await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].every(a=>document.getElementById(a.hash.slice(1)))),'Every internal navigation anchor resolves');
  await page.screenshot({path:path.join(__dirname,'desktop-hero.png')});
  await page.screenshot({path:path.join(__dirname,'desktop.png'),fullPage:true});
  await page.locator('#motion-toggle').click();
  check(await page.locator('#motion-toggle').getAttribute('aria-pressed')==='true','Pause control updates');
  check(await page.locator('.liquid-sheet').first().evaluate(el=>getComputedStyle(el).animationPlayState)==='paused','Pause freezes decorative motion');
  await page.locator('#motion-toggle').click();
  for(const id of ['endnovel','flurzi360','commit','flurzix','rush','cortex','cinema']) {
   const trigger=page.locator(`.platform-row[data-platform="${id}"]`);
   await trigger.click();
   check(await page.locator('#detail-dialog').evaluate(d=>d.open),'Detail opens: '+id);
   check((await page.locator('#detail-dialog h2').innerText()).length>0,'Detail heading: '+id);
   await page.keyboard.press('Escape');
   check(await trigger.evaluate(el=>document.activeElement===el),'Escape restores focus: '+id);
  }
  await page.locator('.platform-row[data-platform="flurzi360"]').click();
  check((await page.locator('#detail-dialog').innerText()).includes('does not offer employment or visa sponsorship'),'Flurzi360 audience clarification');
  await page.locator('#detail-dialog [data-enquiry]').click();
  await page.waitForTimeout(100);
  check(await page.locator('#enquiry-dialog').evaluate(d=>d.open),'Platform enquiry handoff');
  check(await page.locator('#enquiry-topic').inputValue()==='Platform enquiry','Correct topic selected');
  check(await page.evaluate(()=>document.body.style.overflow==='hidden'),'Scroll remains locked when switching dialogs');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  check(await page.evaluate(()=>document.body.style.overflow===''),'Closing dialog restores scroll');
  await page.locator('[data-company]').first().click();
  check((await page.locator('#company-dialog').innerText()).includes('Fear Limits Us, Rising Zeal Imprints.'),'Approved corporate identity');
  await page.screenshot({path:path.join(__dirname,'company-detail.png')});
  await page.locator('#company-dialog [data-close]').click();
  for(const width of [390,320]) {
   await page.setViewportSize({width,height:844});await page.evaluate(()=>scrollTo(0,0));
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No page overflow at '+width);
   await page.locator('.menu-toggle').click();
   check(await page.locator('.menu-toggle').getAttribute('aria-expanded')==='true','Menu expands at '+width);
   await page.locator('#mobile-menu nav a').first().focus();
   for(let i=0;i<9;i++)await page.keyboard.press('Tab');
   check(await page.evaluate(()=>document.activeElement.closest('#mobile-menu')!==null),'Keyboard focus contained at '+width);
   if(width===390)await page.screenshot({path:path.join(__dirname,'mobile-menu.png')});
   await page.locator('#mobile-menu a[href="#ecosystem"]').click();
   check(await page.locator('#mobile-menu').evaluate(d=>!d.open),'Menu closes on navigation at '+width);
   await page.locator('.platform-row[data-platform="commit"]').click();
   check(await page.locator('#detail-dialog').evaluate(d=>d.scrollWidth<=d.clientWidth),'Detail does not overflow at '+width);
   await page.keyboard.press('Escape');await page.evaluate(()=>scrollTo(0,0));
   if(width===390){await page.screenshot({path:path.join(__dirname,'mobile-hero.png')});await page.screenshot({path:path.join(__dirname,'mobile.png'),fullPage:true});}
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  check(await page.locator('.liquid-sheet').first().evaluate(el=>getComputedStyle(el).animationName)==='none','Reduced motion removes animation');
  check(await page.locator('#motion-toggle').isDisabled(),'Reduced-motion setting is respected');
  check(errors.length===0,'No browser script errors');
 } finally {await browser.close();}
 const result={checkedAt:'2026-10-11',checks,errors};
 fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({passed:checks.filter(c=>c.passed).length,total:checks.length,failures:checks.filter(c=>!c.passed),errors},null,2));
 if(checks.some(c=>!c.passed)||errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
