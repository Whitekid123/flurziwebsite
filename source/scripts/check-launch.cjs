const {chromium}=require('playwright');
const fs=require('node:fs');
const base=process.argv[2]||'http://localhost:3411';
const checks=[],errors=[];const check=(value,label)=>checks.push({label,passed:Boolean(value)});
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844}});page.setDefaultNavigationTimeout(90000);page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(base,{waitUntil:'networkidle'});const headers=response.headers();
 for(const h of ['x-content-type-options','x-frame-options','referrer-policy','permissions-policy','content-security-policy'])check(Boolean(headers[h]),h+' present');
 const redirect=await page.request.get(base+'/products/endnovel',{headers:{host:'flurzi.com'},maxRedirects:0});check(redirect.status()===308&&redirect.headers().location==='https://www.flurzi.com/products/endnovel','Apex domain redirects permanently to canonical host');
 const robots=await page.request.get(base+'/robots.txt');check(robots.status()===200&&(await robots.text()).includes('https://www.flurzi.com/sitemap.xml'),'robots links canonical sitemap');
 check(await page.locator('script[src*="googletagmanager"]').count()===0,'Analytics off without configured property');
 for(const [width,height] of [[320,568],[390,844],[844,390],[1440,900]]){
  await page.setViewportSize({width,height});
  for(const motion of ['reduce','no-preference']){
   await page.emulateMedia({reducedMotion:motion});await page.evaluate(()=>scrollTo(0,0));await page.locator('.editorial-menu-button').click();await page.waitForTimeout(900);
   check(await page.locator('#site-menu').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=70&&r.bottom<=innerHeight&&r.height>innerHeight-140;}),`Menu fits viewport ${width}x${height} ${motion}`);
   check(await page.locator('header').evaluate(e=>getComputedStyle(e).backdropFilter)==='none','Open menu has no filtered containing block');
   const last=page.locator('#site-menu a').last();await last.focus();
   check(await last.evaluate(e=>{const r=e.getBoundingClientRect(),panel=document.querySelector('#site-menu').getBoundingClientRect();return r.top>=panel.top&&r.bottom<=panel.bottom+1;}),'Last menu link reachable by scrolling');
   await page.keyboard.press('Tab');check(await page.locator('.editorial-menu-button').evaluate(e=>e===document.activeElement),'Keyboard focus stays in menu');
   await page.keyboard.press('Escape');await page.waitForTimeout(500);check(await page.locator('#site-menu').count()===0,'Escape dismisses menu');
  }
 }
 await page.goto(base+'/products/flurzi360');check(await page.getByRole('heading',{name:'Available in Version 1.'}).count()===1,'Flurzi360 separates available release');check(await page.getByRole('heading',{name:'Still in development.'}).count()===1,'Flurzi360 separates expansion');check(await page.getByRole('link',{name:/Register for Version 1/}).getAttribute('href')==='https://app.sponsorsafe-hr.com/signup','Existing workforce self-service link');
 await page.goto(base+'/products/endnovel');check(await page.locator('a[href="https://play.google.com/store/apps/details?id=com.endnovel.endnovel_app"]').count()===1,'Android download destination');check(await page.locator('a[href="https://apps.apple.com/app/id6782002330"]').count()===1,'iOS download destination');
 await page.goto(base+'/products/flurzix');const x=await page.locator('main').innerText();check(['verification','inspection','traceability'].every(word=>x.toLowerCase().includes(word)),'FlurziX trust direction');check(!x.includes('Available in Version 1.'),'FlurziX not presented as launched');
 await page.goto(base+'/products/commit');check((await page.locator('main').innerText()).includes('does not hold customer funds'),'Commit excludes fund custody');
 await page.goto(base+'/contact');check(await page.locator('.contact-unavailable').count()===1,'No inactive form advertised as functional');
 fs.mkdirSync('screenshots/launch',{recursive:true});await page.setViewportSize({width:390,height:844});await page.goto(base);await page.locator('.editorial-menu-button').click();await page.waitForTimeout(900);await page.screenshot({path:'screenshots/launch/menu-mobile.png'});
 check(errors.length===0,'No runtime errors');
}finally{await browser.close();}console.log(JSON.stringify({passed:checks.filter(c=>c.passed).length,total:checks.length,failures:checks.filter(c=>!c.passed),errors},null,2));if(checks.some(c=>!c.passed)||errors.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1});
