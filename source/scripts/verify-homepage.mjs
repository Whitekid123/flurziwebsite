import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.argv[2]||'http://localhost:3000';
fs.mkdirSync('screenshots/corporate-refinement',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const failures=[],measurements=[];
const check=(value,label)=>{if(!value)failures.push(label);};
try{
for(const [name,width,height,reducedMotion] of [
 ['desktop',1440,1000,'no-preference'],['mobile',390,844,'no-preference'],
 ['tablet',768,1024,'no-preference'],['laptop',1024,900,'no-preference'],
 ['wide',1920,1080,'no-preference'],['reduced',1440,1000,'reduce'],['small',320,740,'reduce']
]){
 if(process.argv[3]&&!process.argv[3].split(',').includes(name))continue;
 const context=await browser.newContext({viewport:{width,height},reducedMotion,deviceScaleFactor:1,isMobile:width<600,hasTouch:width<600});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(base,{waitUntil:'networkidle',timeout:120000});
 await page.waitForTimeout(2600);
 check(response.status()===200,name+': home responds');
 check(await page.locator('h1').count()===1,name+': one heading');
 check((await page.locator('h1').innerText()).includes('Many worlds.'),name+': corporate headline');
 check(await page.locator('.hq-hq-card').count()===0,name+': corporate hero has no dashboard');
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+': no page overflow');
 check(await page.locator('.hq-showcase a[href^="/products/"]').evaluateAll(els=>new Set(els.map(el=>el.getAttribute('href'))).size)===7,name+': seven portfolio destinations');
 await page.screenshot({path:'screenshots/corporate-refinement/'+name+'-hero.png'});
 check(await page.locator('.hq-liquid-sculpture').count()===0,name+': oversized loop removed');
 const piece=page.locator('.hq-kinetic-piece').first();
 const motionBefore=await piece.evaluate(el=>getComputedStyle(el).transform);
 if(reducedMotion==='no-preference'){
  const moved=await page.waitForFunction(before=>getComputedStyle(document.querySelector('.hq-kinetic-piece')).transform!==before,motionBefore,{timeout:14000,polling:100}).then(()=>true,()=>false);
  check(moved,name+': geometry moves without interaction');
 }else{
  await page.waitForTimeout(400);
  check(motionBefore===await piece.evaluate(el=>getComputedStyle(el).transform),name+': geometry respects reduced motion');
 }
 const pause=page.getByRole('button',{name:'Pause animation'});
 if(reducedMotion==='no-preference'){
  await pause.click();
  check(await page.locator('.hq-hero').evaluate(el=>el.classList.contains('is-paused')),name+': motion can be paused');
  check(await piece.evaluate(el=>getComputedStyle(el).animationPlayState==='paused'),name+': geometry pauses');
  await page.getByRole('button',{name:'Resume animation'}).click();
 }else{
  check(await page.locator('canvas').count()===0,name+': reduced motion skips WebGL');
  check(await page.locator('.hq-discover-orbit svg').evaluate(el=>getComputedStyle(el).animationName==='none'),name+': reduced motion stops orbit');
 }
 if(width>=1000&&reducedMotion==='no-preference'){
  const before=await page.locator('.hq-hero-line').first().evaluate(el=>getComputedStyle(el).transform);
  await page.evaluate(()=>{window.__lenis?.scrollTo(innerHeight*.4,{immediate:true});window.scrollTo(0,innerHeight*.4);});
  await page.waitForTimeout(1500);
  const after=await page.locator('.hq-hero-line').first().evaluate(el=>getComputedStyle(el).transform);
  check(before!==after,name+': hero type responds to scroll');
  measurements.push({name,waterReady:await page.locator('.hq-hero').evaluate(el=>el.classList.contains('is-ready')),before,after});
  await page.screenshot({path:'screenshots/corporate-refinement/'+name+'-hero-scroll.png'});
 }
 await page.locator('#ecosystem').scrollIntoViewIfNeeded();await page.waitForTimeout(1500);
 await page.screenshot({path:'screenshots/corporate-refinement/'+name+'-portfolio.png'});
 const worlds=page.locator('.hq-world');
 check(await worlds.count()===3,name+': three featured platform worlds');
 for(let i=0;i<await worlds.count();i++){await worlds.nth(i).scrollIntoViewIfNeeded();await page.waitForTimeout(1000);await page.screenshot({path:'screenshots/corporate-refinement/'+name+'-world-'+i+'.png'});}
 check(await page.locator('.hq-world img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)),name+': supplied artwork loads');
 await page.screenshot({path:'screenshots/corporate-refinement/'+name+'-artwork.png'});
 await page.locator('.hq-venture-list').scrollIntoViewIfNeeded();await page.waitForTimeout(1500);
 await page.screenshot({path:'screenshots/corporate-refinement/'+name+'-ventures.png'});
 for(const section of ['.hq-directions','.hq-progress','.hq-purpose','.hq-partnerships']){
  await page.locator(section).evaluate(el=>{const y=el.getBoundingClientRect().top+scrollY-90;window.__lenis?.scrollTo(y,{immediate:true});window.scrollTo(0,y);});
  await page.waitForTimeout(1200);
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+': no overflow at '+section);
  await page.screenshot({path:'screenshots/corporate-refinement/'+name+'-'+section.slice(4)+'.png'});
 }
 const anchors=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')).filter(h=>h.length>1));
 for(const hash of new Set(anchors))check(await page.locator(hash).count()>0,name+': anchor '+hash);
 if(width<600){
  await page.evaluate(()=>{window.__lenis?.scrollTo(0,{immediate:true});window.scrollTo(0,0);});await page.waitForTimeout(500);
  const toggle=page.getByRole('button',{name:'Menu',exact:true});await toggle.click();await page.waitForTimeout(700);
  check(await page.locator('#site-menu').isVisible(),name+': menu opens');
  await page.keyboard.press('Escape');await page.waitForTimeout(700);
  check(await page.locator('#site-menu').count()===0,name+': Escape closes menu');
  check(await toggle.evaluate(el=>el===document.activeElement),name+': menu restores focus');
 }
 check(errors.length===0,name+': no runtime errors: '+errors.join('; '));
 console.log(name+' checked');
 await context.close();
}
}finally{await browser.close();}
fs.writeFileSync('screenshots/corporate-refinement/qa-results'+(process.argv[3]?'-'+process.argv[3].replaceAll(',','-'):'')+'.json',JSON.stringify({failures,measurements},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('All corporate homepage checks passed.');
