import {chromium} from 'playwright';
import fs from 'node:fs';
import sharp from 'sharp';
const base=process.argv[2]||'http://localhost:3402';
const dir='screenshots/liquid-brand';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:process.env.LIQUID_SOFTWARE_RENDER==='1'?['--use-angle=swiftshader','--enable-unsafe-swiftshader']:[]});
const failures=[],errors=[],measurements={};
const check=(ok,message)=>{if(!ok)failures.push(message);};
const difference=async(a,b)=>{
 const aa=await sharp(a).resize(150,40).removeAlpha().raw().toBuffer(),bb=await sharp(b).resize(150,40).removeAlpha().raw().toBuffer();
 return aa.reduce((sum,v,i)=>sum+Math.abs(v-bb[i]),0)/aa.length;
};
try{
 const context=await browser.newContext({viewport:{width:1280,height:900}});
 const page=await context.newPage();page.setDefaultTimeout(20000);
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',msg=>{if(msg.type()==='error'&&/shader|WebGL|THREE/i.test(msg.text()))errors.push(msg.text());});
 await page.goto(base,{waitUntil:'networkidle',timeout:60000});
 await page.locator('.display-ready').waitFor();await page.waitForTimeout(1400);
 console.log('Hero ready');
 check(await page.locator('header .brand-mark').evaluate(el=>el.complete&&el.naturalWidth===151),'original logo loads in header');
 check(await page.locator('footer .brand-mark').count()===1,'original logo in footer');
 check(await page.locator('.company-logo').count()===1,'original logo in company section');
 check(await page.locator('.hero-products a').count()===4,'all four hero products preserved');
 check((await context.request.get(base+'/icon.png')).status()===200,'original brand app icon serves');
 await page.screenshot({path:dir+'/desktop-water.png',timeout:15000});
 // Sample only water, below the product windows and above footer labels.
 const clip={x:900,y:820,width:310,height:25};
 const first=await page.screenshot({clip,timeout:15000});
 await page.waitForTimeout(1100);
 const second=await page.screenshot({clip,timeout:15000});
 measurements.waterMovement=await difference(first,second);
 check(measurements.waterMovement>.2,'water surface changes while pointer is stationary');
 await page.getByRole('button',{name:'Pause water motion'}).click();
 await page.waitForTimeout(1100);
 const frozen=await page.screenshot({clip,timeout:15000});await page.waitForTimeout(700);
 const frozenAgain=await page.screenshot({clip,timeout:15000});
 measurements.pausedMovement=await difference(frozen,frozenAgain);
 check(measurements.pausedMovement<.15,'water pause freezes the surface');
 await page.getByRole('button',{name:'Resume water motion'}).click();
 console.log('Water motion and pause checked');
 await page.evaluate(()=>{const y=(document.querySelector('.home-opening').offsetHeight-innerHeight)*.42;window.__lenis?.scrollTo(y,{immediate:true});window.scrollTo(0,y);});
 await page.waitForTimeout(1000);
 await page.screenshot({path:dir+'/scroll-refraction.png',timeout:15000});
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(600);
 check(await page.locator('canvas').count()===0,'reduced motion removes liquid WebGL');
 check(await page.locator('.world-preview').count()===4,'reduced motion retains four product images');
 check(errors.length===0,'no runtime or shader compilation errors');
 await context.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const phone=await mobile.newPage();
 await phone.goto(base,{waitUntil:'networkidle',timeout:60000});await phone.waitForTimeout(1200);
 check(await phone.locator('header .brand-mark').evaluate(el=>el.complete&&el.naturalWidth===151),'mobile original logo loads');
 check(await phone.locator('canvas').count()===0,'mobile keeps lightweight fallback');
 check(await phone.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no mobile overflow');
 await phone.screenshot({path:dir+'/mobile-brand.png',timeout:15000});
 await phone.getByRole('button',{name:'Menu',exact:true}).click();await phone.waitForTimeout(700);
 check(await phone.locator('#site-menu').isVisible(),'mobile menu opens with new logo');
 await mobile.close();
}catch(error){failures.push(error.message);console.error(error.message);}
finally{await browser.close();fs.writeFileSync(dir+'/qa-results.json',JSON.stringify({checkedAt:new Date().toISOString(),measurements,errors,failures},null,2));}
console.log(JSON.stringify({measurements,errors,failures}));
if(failures.length)process.exitCode=1;


