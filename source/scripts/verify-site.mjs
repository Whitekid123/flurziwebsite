import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.argv[2]||'http://localhost:3400';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const failures=[];
const products=['endnovel','flurzi360','commit','flurzix','flurzirush','cortex','cinema'];
const routes=['/','/products',...products.map(s=>'/products/'+s),'/products/sponsorsafe','/about','/projects','/innovation','/partnerships','/faq','/contact','/testing-opportunity','/privacy-policy','/terms','/disclaimer','/data-protection'];
fs.mkdirSync('screenshots/editorial',{recursive:true});
const check=(value,label)=>{if(!value)failures.push(label);};
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage(),errors=[],links=new Set(),titles=new Set();
page.on('pageerror',e=>errors.push(e.message));
for(const path of routes){
 const response=await page.goto(base+path,{waitUntil:'networkidle',timeout:60000});
 await page.waitForTimeout(path==='/'?2200:1000);
 check(response.status()===200,path+': status '+response.status());
 if(path==='/projects'){check(page.url().includes('/innovation'),path+': redirects to /innovation, got '+page.url());console.log('Checked '+path);continue;}
 check(await page.locator('h1').count()===1,path+': one heading');
 const title=await page.title();check(!titles.has(title),path+': unique page title');titles.add(title);
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path+': no overflow');
 for(const href of await page.locator('a[href^="/"]').evaluateAll(els=>els.map(el=>el.getAttribute('href').split(/[?#]/)[0])))links.add(href);
 if(['/','/products','/about','/faq','/products/flurzi360','/contact','/innovation'].includes(path))await page.screenshot({path:'screenshots/editorial/desktop-'+(path.slice(1).replaceAll('/','-')||'home')+'.png'});
 if(path==='/products/sponsorsafe')check(page.url().includes('/products/flurzi360')||(await page.locator('h1').innerText()).includes('Flurzi360'),'sponsorsafe alias resolves to Flurzi360');
 if(path==='/products'){
  check(await page.locator('.hq-platform-row').count()===7,path+': seven directory rows');
  await page.getByRole('button',{name:'Finance'}).click();await page.waitForTimeout(400);
  const finance=await page.locator('.hq-platform-row').count();
  check(finance>=1&&finance<7,path+': finance filter narrows rows, got '+finance);
  await page.getByRole('button',{name:'All platforms'}).click();await page.waitForTimeout(400);
  check(await page.locator('.hq-platform-row').count()===7,path+': reset restores rows');
  check(await page.locator('.hq-stage-guide dt').count()===4,path+': four stage definitions');
 }
 if(path.startsWith('/products/')&&path!=='/products/sponsorsafe'){
  check(await page.locator('.hq-detail-visual').count()>=1,path+': detail visual present');
  check(await page.locator('.hq-availability-note').count()>=1,path+': availability note present');
  check((await page.locator('.hq-detail-visual').innerText()).length>0,path+': visual is a real fragment');
 }
 if(path==='/'){
  await page.locator('.hq-statement').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
  const rule=await page.locator('.hq-statement-rule').evaluate(el=>getComputedStyle(el).transform);
  check(rule!=='none','home: statement rule draws on scroll');
  await page.screenshot({path:'screenshots/editorial/desktop-home-scroll.png'});
 }
 if(path==='/faq'){
  await page.locator('summary').filter({hasText:'What does FLURZIHQ mean?'}).click();
  check(await page.locator('details[open]').count()===1,'FAQ opens');
  check((await page.locator('details[open]').innerText()).toLowerCase().includes('headquarters'),'HQ meaning answered');
  check(await page.locator('.hq-faq-layout aside').count()>=1,'FAQ index present');
 }
 if(['/privacy-policy','/terms','/disclaimer','/data-protection'].includes(path)){
  const paragraphs=await page.locator('.hq-policy-content p').allTextContents();
  check(paragraphs.length>=5,path+': complete policy sections, got '+paragraphs.length);
  check((await page.locator('.hq-policy-review-note').innerText()).includes('Flurzi Limited'),path+': review note names legal entity');
 }
 console.log('Checked '+path);
}
for(const path of links){const response=await context.request.get(base+path);check(response.status()===200,'linked page '+path+' -> '+response.status());}
check((await context.request.get(base+'/not-a-page')).status()===404,'unknown page returns 404');
await page.goto(base+'/contact?topic=privacy',{waitUntil:'networkidle'});await page.waitForTimeout(800);
if(await page.locator('#contact-topic').count()>0){
 check(await page.locator('#contact-topic').inputValue()==='Privacy and data protection','contact topic prefilled from query');
}else{
 check((await page.locator('.hq-contact-unavailable').innerText()).toLowerCase().includes('not open yet'),'contact unavailable state honest');
}
check(await page.locator('[role=status]').count()===0,'no false contact success');
check(await page.locator('#registered-office').count()===1,'registered office anchor present');
check(errors.length===0,'desktop runtime errors: '+errors.join(';'));
await context.close();
for(const [name,width,height,reducedMotion] of [['mobile',390,844,'no-preference'],['small',320,740,'reduce']]){
 const ctx=await browser.newContext({viewport:{width,height},reducedMotion,isMobile:true,hasTouch:true});
 const p=await ctx.newPage(),mobileErrors=[];p.on('pageerror',e=>mobileErrors.push(e.message));
 for(const path of ['/','/products','/products/commit','/about','/projects','/faq','/contact','/innovation','/privacy-policy']){
  await p.goto(base+path,{waitUntil:'networkidle'});await p.waitForTimeout(path==='/'?2200:1000);
  check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+path+': no overflow');
  check(await p.locator('h1').count()===1,name+path+': one heading');
  if(['/','/about','/contact'].includes(path))await p.screenshot({path:'screenshots/editorial/'+name+'-'+(path.slice(1)||'home')+'.png'});
 }
 await p.goto(base,{waitUntil:'networkidle'});await p.waitForTimeout(1200);
 const toggle=p.getByRole('button',{name:'Menu'});await toggle.click();await p.waitForTimeout(600);
 check(await p.locator('#site-menu').isVisible(),name+': menu opens');
 await p.keyboard.press('Escape');await p.waitForTimeout(700);
 check(await toggle.evaluate(el=>el===document.activeElement),name+': menu restores focus');
 await toggle.click();await p.waitForTimeout(600);
 await p.locator('#site-menu').getByRole('link',{name:'Ecosystem'}).click();
 await p.waitForURL('**/products');await p.waitForTimeout(800);
 check(await p.locator('#site-menu').count()===0,name+': route navigation closes menu');
 check(mobileErrors.length===0,name+': runtime errors '+mobileErrors.join(';'));
 if(reducedMotion==='reduce'){await p.goto(base);await p.waitForTimeout(1200);check(await p.locator('canvas').count()===0,name+': reduced motion avoids WebGL');check(await p.locator('.hq-directions-anchor').evaluate(el=>getComputedStyle(el).position)==='relative',name+': reduced motion removes sticky anchor');}
 await ctx.close();console.log('Checked '+name);
}
await browser.close();
fs.writeFileSync('screenshots/editorial/qa-results.json',JSON.stringify({checkedAt:new Date().toISOString(),routes,failures},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('All '+routes.length+' routes, content, navigation and responsive checks passed.');
