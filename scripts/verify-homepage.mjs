import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.argv[2]||'http://localhost:3400';
fs.mkdirSync('screenshots',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const failures=[],measurements=[];
const assert=(value,label)=>{if(!value)failures.push(label);};
for(const [name,viewport,reducedMotion] of [
 ['desktop',{width:1440,height:1000},'no-preference'],
 ['mobile',{width:390,height:844},'no-preference'],
 ['reduced',{width:1440,height:1000},'reduce'],
 ['small',{width:320,height:740},'reduce'],
]){
 const context=await browser.newContext({viewport,reducedMotion,deviceScaleFactor:1,isMobile:name==='mobile',hasTouch:name==='mobile'});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(base,{waitUntil:'networkidle',timeout:120000});
 await page.waitForTimeout(2200);
 if(name==='desktop')await page.locator('.hero-art.scene-ready').waitFor({timeout:60000});
 assert(response.status()===200,name+': HTTP 200');
 assert(await page.locator('h1').count()===1,name+': one main heading');
 assert((await page.locator('h1').innerText()).includes('Built by Flurzi.'),name+': headline');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+': no horizontal overflow');
 await page.screenshot({path:'screenshots/'+name+'-hero.png'});
 const jump=async y=>{await page.evaluate(y=>{window.__lenis?.scrollTo(y,{immediate:true});window.scrollTo(0,y);},y);await page.waitForTimeout(1100);};
 const position=async selector=>page.locator(selector).evaluate(el=>el.getBoundingClientRect().top+window.scrollY);
 const anchors=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')).filter(h=>h.length>1));
 for(const hash of new Set(anchors))assert(await page.locator(hash).count()>0,name+': anchor '+hash);
 if(reducedMotion==='no-preference'){
  const scrollDistance=await page.locator('.flagship-hero').evaluate(el=>el.offsetHeight-innerHeight);
  await jump(scrollDistance*.57);
  const state=await page.evaluate(()=>({
   title:getComputedStyle(document.querySelector('.hero-line-one')).transform,
   art:getComputedStyle(document.querySelector('.hero-art')).transform,
   reveal:Number(getComputedStyle(document.querySelector('.hero-reveal')).opacity),
   stageTop:document.querySelector('.hero-stage').getBoundingClientRect().top
  }));
  measurements.push({name,heroMidpoint:state});
  assert(state.title!=='none'&&state.art!=='none'&&state.reveal>.5&&Math.abs(state.stageTop)<2,name+': hero transforms and reveals during sticky scroll');
  await page.screenshot({path:'screenshots/'+name+'-hero-scroll.png'});
 }
 for(const id of ['sponsorsafe','commit','cinema','endnovel']){
  const y=await position('#'+id);
  await jump(y);
  if(name==='desktop'||name==='mobile')await page.screenshot({path:'screenshots/'+name+'-'+id+'.png'});
  assert(await page.locator('[data-world='+id+'] .product-cta').isVisible(),name+': '+id+' CTA visible');
 }
 if(reducedMotion==='no-preference'){
  const y=await position('#commit');
  await jump(y-viewport.height*.5);
  const transform=await page.locator('[data-world=commit] .world-visual').evaluate(el=>getComputedStyle(el).transform);
  const clip=await page.locator('[data-world=commit] .world-stage').evaluate(el=>getComputedStyle(el).clipPath);
  await jump(y);
  const settled=await page.locator('[data-world=commit] .world-visual').evaluate(el=>getComputedStyle(el).transform);
  assert(transform!==settled&&clip!=='none',name+': product perspective and clipping respond to scroll');
  measurements.push({name,productTransition:{entering:transform,settled,clip}});
 }
 for(const id of ['about','future','contact']){
  await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(1100);
  if(name==='desktop'||name==='mobile')await page.screenshot({path:'screenshots/'+name+'-'+id+'.png'});
 }
 assert(await page.locator('.product-image').evaluateAll(els=>els.every(el=>el.tagName!=='IMG'||(el.complete&&el.naturalWidth>0))),name+': images loaded');
 assert(await page.locator('a[href="mailto:hello@flurzimobileapp.co.uk"]').count()>0,name+': email link');
 if(name==='mobile'||name==='small'){
  await jump(0);
  const toggle=page.getByRole('button',{name:'Menu',exact:false});
  await toggle.click();
  assert(await page.locator('#mobile-navigation').isVisible(),name+': menu opens');
  await page.keyboard.press('Escape');
  assert(await page.locator('#mobile-navigation').count()===0,name+': Escape closes menu');
  assert(await toggle.evaluate(el=>el===document.activeElement),name+': focus restores');
  await toggle.click();
  await page.locator('#mobile-navigation').getByRole('link',{name:'Our products'}).click();
  await page.waitForTimeout(1500);
  assert(await page.locator('#mobile-navigation').count()===0,name+': navigation closes menu');
  const top=await page.locator('#products').evaluate(el=>el.getBoundingClientRect().top);
  assert(top>=70&&top<=100,name+': menu reaches product section: '+top);
 }
 if(reducedMotion==='reduce'){
  assert(await page.locator('canvas').count()===0,name+': reduced motion avoids WebGL');
  assert(await page.locator('.world-card').first().evaluate(el=>getComputedStyle(el).position)==='relative',name+': reduced motion removes sticky chapters');
 }
 assert(errors.length===0,name+': no runtime errors: '+errors.join('; '));
 console.log(name,errors.length?'ERRORS '+errors.join('; '):'checked');
 await context.close();
}
await browser.close();
fs.writeFileSync('screenshots/qa-results.json',JSON.stringify({checkedAt:new Date().toISOString(),failures,measurements},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('All homepage and scroll checks passed.');
