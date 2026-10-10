import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.argv[2]||'http://localhost:3400';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const failures=[],routes=['/','/products','/products/sponsorsafe','/products/commit','/products/cinema','/products/endnovel','/about','/projects','/faq','/contact','/privacy-policy','/terms','/disclaimer','/data-protection'];
fs.mkdirSync('screenshots/editorial',{recursive:true});
const check=(value,label)=>{if(!value)failures.push(label);};
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage(),errors=[],links=new Set(),titles=new Set();
page.on('pageerror',e=>errors.push(e.message));
for(const path of routes){
 const response=await page.goto(base+path,{waitUntil:'networkidle',timeout:60000});
 await page.waitForTimeout(path==='/'?2200:1000);
 check(response.status()===200,path+': status');
 check(await page.locator('h1').count()===1,path+': one heading');
 const title=await page.title();check(!titles.has(title),path+': unique page title');titles.add(title);
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path+': no overflow');
 for(const href of await page.locator('a[href^="/"]').evaluateAll(els=>els.map(el=>el.getAttribute('href').split(/[?#]/)[0])))links.add(href);
 if(['/','/products','/about','/faq','/products/sponsorsafe','/contact'].includes(path))await page.screenshot({path:'screenshots/editorial/desktop-'+(path.slice(1).replaceAll('/','-')||'home')+'.png'});
 if(path==='/'){
  const initial=await page.locator('.opening-screen-wipe').evaluate(el=>getComputedStyle(el).clipPath);
  await page.evaluate(()=>{const y=document.querySelector('.home-opening').clientHeight-innerHeight;window.__lenis?.scrollTo(y*.75,{immediate:true});window.scrollTo(0,y*.75);});
  await page.waitForTimeout(1000);
  check(await page.locator('.opening-screen-wipe').evaluate(el=>getComputedStyle(el).clipPath)!==initial,'home: scroll expands the screen transition');
  await page.screenshot({path:'screenshots/editorial/desktop-home-scroll.png'});
 }
 if(path==='/faq'){
  await page.locator('summary').filter({hasText:'What does FLURZI stand for?'}).click();
  check(await page.locator('details[open]').count()===1,'FAQ opens');
  check((await page.locator('details[open]').innerText()).includes('Future-focused Lifestyle'),'brand meaning preserved');
 }
 if(['/privacy-policy','/terms','/disclaimer','/data-protection'].includes(path)){
  const source=JSON.parse(fs.readFileSync('docs/source-audit/'+path.slice(1)+'.json','utf8'));
  const paragraphs=await page.locator('.policy-content p').allTextContents();
  check(paragraphs.length>=5,path+': complete policy sections');
  check(paragraphs.every(p=>source.text.includes(p)),path+': policy paragraphs match live-source snapshot');
 }
 console.log('Checked '+path);
}
for(const path of links){const response=await context.request.get(base+path);check(response.status()===200,'linked page '+path);}
check((await context.request.get(base+'/not-a-page')).status()===404,'unknown page returns 404');
await page.goto(base+'/contact?product=sponsorsafe',{waitUntil:'networkidle'});
check(await page.locator('#contact-topic').inputValue()==='SponsorSafe HR demo','product contact topic prefilled');
await page.getByRole('button',{name:'Open email draft'}).click();
check(await page.locator('#contact-name').evaluate(el=>!el.validity.valid),'contact validates name before drafting');
check(await page.locator('[role=status]').count()===0,'no false contact success');
check(errors.length===0,'desktop runtime errors: '+errors.join(';'));
await context.close();
for(const [name,width,height,reducedMotion] of [['mobile',390,844,'no-preference'],['small',320,740,'reduce']]){
 const ctx=await browser.newContext({viewport:{width,height},reducedMotion,isMobile:true,hasTouch:true});
 const p=await ctx.newPage(),mobileErrors=[];p.on('pageerror',e=>mobileErrors.push(e.message));
 for(const path of ['/','/products','/products/commit','/about','/projects','/faq','/contact','/privacy-policy']){
  await p.goto(base+path,{waitUntil:'networkidle'});await p.waitForTimeout(path==='/'?2200:1000);
  check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+path+': no overflow');
  if(['/','/about','/contact'].includes(path))await p.screenshot({path:'screenshots/editorial/'+name+'-'+(path.slice(1)||'home')+'.png'});
 }
 await p.goto(base,{waitUntil:'networkidle'});await p.waitForTimeout(1200);
 const toggle=p.getByRole('button',{name:'Menu',exact:true});await toggle.click();check(await p.locator('#site-menu').isVisible(),name+': menu opens');await p.keyboard.press('Escape');await p.waitForTimeout(550);check(await toggle.evaluate(el=>el===document.activeElement),name+': menu restores focus');await toggle.click();await p.locator('#site-menu').getByRole('link',{name:'Products',exact:false}).click();await p.waitForURL('**/products');check(await p.locator('#site-menu').count()===0,name+': route navigation closes menu');
 check(mobileErrors.length===0,name+': runtime errors '+mobileErrors.join(';'));
 if(reducedMotion==='reduce'){await p.goto(base);check(await p.locator('.opening-stage').evaluate(el=>getComputedStyle(el).position)==='relative','reduced motion removes sticky opening');}
 await ctx.close();console.log('Checked '+name);
}
await browser.close();
fs.writeFileSync('screenshots/editorial/qa-results.json',JSON.stringify({checkedAt:new Date().toISOString(),routes,failures},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('All 14 routes, content, navigation and responsive checks passed.');
