import {chromium} from 'playwright';
import fs from 'node:fs';
import sharp from 'sharp';
const base=process.argv[2]||'http://localhost:3401';
fs.mkdirSync('screenshots/expanded-home',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const failures=[],results=[];
const check=(ok,label)=>{if(!ok)failures.push(label);};
for(const [name,width,height,motion] of [['desktop',1440,1000,'no-preference'],['tablet',900,900,'no-preference'],['mobile',390,844,'no-preference'],['small',320,740,'reduce']]){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:motion,isMobile:width<700,hasTouch:width<700});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle',timeout:120000});
 if(name==='desktop')await page.locator('.display-ready').waitFor({timeout:60000});
 await page.waitForTimeout(1800);
 check(await page.locator('h1').count()===1,name+': one primary heading');
 check(await page.locator('.hero-products a').count()===4,name+': all four products in hero');
 check(await page.locator('.product-chapter').count()===4,name+': four full product chapters');
 check(await page.locator('.world-preview img').count()===4,name+': all four fallback images');
 await page.screenshot({path:'screenshots/expanded-home/'+name+'-hero.png'});
 if(name==='desktop'){
  await page.locator('.hero-product-2').hover();
  check(await page.locator('.ecosystem-opening').getAttribute('data-highlighted')==='2','hero product hover highlights Cinema');
  await page.mouse.move(10,10);
 }
 const shots=[];
 for(const selector of ['.ecosystem-intro','.chapter-sponsorsafe','.chapter-commit','.chapter-cinema','.chapter-endnovel','.expanded-company','.product-finder','.expanded-next','.home-questions']){
  await page.locator(selector).evaluate(el=>{const y=el.getBoundingClientRect().top+scrollY-92;window.__lenis?.scrollTo(y,{immediate:true});window.scrollTo(0,y);});
  await page.waitForTimeout(1100);
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+selector+': no overflow');
  if(name==='desktop'||name==='mobile'){
   const buffer=await page.screenshot({path:'screenshots/expanded-home/'+name+'-'+selector.slice(1)+'.png'});
   if(name==='desktop')shots.push(await sharp(buffer).resize(432,300).toBuffer());
  }
 }
 if(shots.length)await sharp({create:{width:1296,height:900,channels:3,background:'#fff'}}).composite(shots.map((input,i)=>({input,left:(i%3)*432,top:Math.floor(i/3)*300}))).png().toFile('screenshots/expanded-home/desktop-overview.png');
 for(const [i,slug] of ['sponsorsafe','commit','cinema','endnovel'].entries()){
  await page.locator('#finder-tab-'+i).click();
  check(await page.locator('[role=tabpanel] a').getAttribute('href')==='/products/'+slug,name+': finder '+slug);
 }
 await page.locator('#finder-tab-3').focus();await page.keyboard.press('ArrowDown');
 check(await page.locator('#finder-tab-0').getAttribute('aria-selected')==='true',name+': finder keyboard wrap');
 await page.locator('.home-question-list summary').first().click();
 check(await page.locator('.home-question-list details[open]').count()===1,name+': FAQ expands');
 const size=await page.evaluate(()=>document.documentElement.scrollHeight);results.push({name,height:size,errors});
 check(errors.length===0,name+': no runtime errors '+errors.join(';'));
 if(motion==='reduce')check(await page.locator('canvas').count()===0,'reduced motion has no canvas');
 console.log('Checked '+name+', page height '+size);
 await context.close();
}
await browser.close();
fs.writeFileSync('screenshots/expanded-home/qa-results.json',JSON.stringify({checkedAt:new Date().toISOString(),results,failures},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('Expanded homepage content, product selection, navigation, keyboard and responsive checks passed.');
