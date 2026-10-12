const {chromium}=require('playwright');
const fs=require('node:fs');
const base=process.argv[2]||'http://localhost:3411';
const dir='screenshots/corporate-story';fs.mkdirSync(dir,{recursive:true});
const checks=[],errors=[];
const check=(passed,label)=>checks.push({label,passed:Boolean(passed)});
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  page.setDefaultNavigationTimeout(90000);
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'networkidle'});
  check(await page.locator('.platform-stories,.story-pair,.direction-grid').count()===0,'Homepage replaces product showcases and repeated grids');
  check(await page.locator('.company-statement h2').innerText().then(t=>t.includes('One company.')&&t.includes('shared ambition.')),'Company-led statement');
  check(await page.locator('.direction-chapter').count()===4,'Four approved technology directions');
  const statementY=await page.locator('.company-statement').evaluate(e=>e.offsetTop);
  const directionY=await page.locator('.corporate-directions').evaluate(e=>e.offsetTop);
  const portfolioY=await page.locator('#ecosystem').evaluate(e=>e.offsetTop);
  check(statementY<directionY&&directionY<portfolioY,'Company and innovation lead into portfolio');
  const tabs=page.getByRole('tab');
  check(await tabs.count()===7,'Seven selectable platforms');
  const slugs=['endnovel','flurzi360','commit','flurzix','flurzirush','cortex','cinema'];
  const names=['EndNovel','Flurzi360','Flurzi Commit','FlurziX','FlurziRush','Flurzi Cortex','Flurzi Cinema'];
  for(let i=0;i<slugs.length;i++){
   await tabs.nth(i).click();
   check(await tabs.nth(i).getAttribute('aria-selected')==='true','Selection state: '+names[i]);
   check(await page.locator('#portfolio-panel h3').innerText()===names[i],'Matching detail: '+names[i]);
   check(await page.locator('#portfolio-panel>.corp-link').getAttribute('href')==='/products/'+slugs[i],'Matching route: '+names[i]);
   check(await page.locator('#portfolio-panel').getAttribute('aria-labelledby')==='portfolio-tab-'+slugs[i],'Accessible panel label: '+names[i]);
   if(['flurzix','flurzirush','cortex'].includes(slugs[i]))check(await page.locator('#portfolio-panel img').count()===0,'No fabricated screenshot: '+names[i]);
  }
  await tabs.first().focus();await page.keyboard.press('End');
  check(await tabs.last().evaluate(e=>document.activeElement===e)&&await tabs.last().getAttribute('aria-selected')==='true','End selects and focuses final platform');
  await page.keyboard.press('ArrowRight');
  check(await tabs.first().evaluate(e=>document.activeElement===e),'Arrow navigation wraps');
  await page.keyboard.press('ArrowLeft');
  check(await tabs.last().evaluate(e=>document.activeElement===e),'Reverse navigation wraps');
  await page.keyboard.press('Home');
  check(await tabs.first().getAttribute('aria-selected')==='true','Home selects first platform');
  await page.locator('#portfolio-panel>.corp-link').click();await page.waitForURL('**/products/endnovel');
  check(await page.locator('h1').innerText()==='EndNovel','Portfolio opens actual detail page');await page.goBack({waitUntil:'networkidle'});
  for(const width of [1440,1024,768,390,320]){
   await page.setViewportSize({width,height:1000});
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow at '+width);
   check(await page.locator('.portfolio-branch').evaluateAll(es=>es.every(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44})),'Portfolio touch targets at '+width);
   await page.locator('.portfolio-branch').last().click();
   check(await page.locator('#portfolio-panel h3').innerText()==='Flurzi Cinema','Portfolio usable at '+width);
   if(width<=600){
    await page.waitForTimeout(250);
    check(await page.locator('#portfolio-panel').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=100&&r.top<200;}),'Mobile selection brings details below header at '+width);
   }
   await page.locator('.portfolio-branch').first().click();
   if(width===1440||width===390){
    await page.locator('img').evaluateAll(es=>es.forEach(e=>e.loading='eager'));
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
    await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});
    await page.screenshot({path:dir+'/home-'+width+'.png',fullPage:true});
    await page.locator('#ecosystem').screenshot({path:dir+'/portfolio-'+width+'.png'});
    await page.locator('.corporate-directions').screenshot({path:dir+'/directions-'+width+'.png'});
   }
  }
  await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(base,{waitUntil:'networkidle'});
  await page.locator('.corporate-opening.water-ready').waitFor({timeout:30000});
  await page.waitForTimeout(1500);
  await page.screenshot({path:dir+'/hero-desktop.png'});
  await page.locator('.company-statement').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
  check(await page.locator('.company-statement-stage').evaluate(e=>getComputedStyle(e).position)==='sticky','Desktop company statement holds while scrolling');
  await page.locator('.directions-index a').nth(2).click();await page.waitForTimeout(1800);
  check(await page.locator('#home-direction-2').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=100&&r.top<200;}),'Technology navigation reaches its section');
  check(await page.locator('.directions-index a').nth(2).evaluate(e=>e.classList.contains('is-current')),'Scroll state marks current technology area');
  check(await page.locator('.direction-contours path').first().evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset)<.05),'Scroll draws corporate contours');
  check(await page.locator('#home-direction-2').evaluate(e=>document.activeElement===e),'Technology link moves keyboard focus to destination');
  check(new URL(page.url()).hash==='#home-direction-2','Technology link preserves shareable section hash');
  await page.locator('.portfolio-branches').scrollIntoViewIfNeeded();await page.waitForTimeout(1500);
  check(await page.locator('.portfolio-branch').evaluateAll(es=>es.every(e=>Number(getComputedStyle(e).opacity)>.99)),'Portfolio reveal finishes with all platforms visible');
  await page.setViewportSize({width:390,height:844});
  await page.locator('.portfolio-branch').last().click();await page.waitForTimeout(1000);
  check(await page.locator('#portfolio-panel').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=100&&r.top<200;}),'Mobile animated selection clears fixed header');
  await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);
  check(await page.locator('.company-statement-stage').evaluate(e=>getComputedStyle(e).position)==='static','Reduced motion removes sticky company sequence');
  check(await page.locator('.directions-anchor').evaluate(e=>getComputedStyle(e).position)==='static','Reduced motion removes sticky direction rail');
  check(await page.locator('.corporate-opening canvas').count()===0,'Reduced motion removes water canvas');
  check(await page.locator('.company-statement h2>span').evaluateAll(es=>es.every(e=>getComputedStyle(e).transform==='none'&&Number(getComputedStyle(e).opacity)===1)),'Reduced motion restores full statement');
  check(errors.length===0,'No runtime errors');
 }finally{await browser.close();fs.writeFileSync(dir+'/validation.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({passed:checks.filter(c=>c.passed).length,total:checks.length,failures:checks.filter(c=>!c.passed),errors},null,2));if(checks.some(c=>!c.passed)||errors.length)process.exitCode=1}
})().catch(e=>{console.error(e);process.exitCode=1});
