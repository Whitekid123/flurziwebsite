import { chromium } from 'playwright';
import fs from 'node:fs';
import sharp from 'sharp';
fs.mkdirSync('public/media',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const products=[['sponsorsafe','https://www.sponsorsafe-hr.com/'],['commit','https://www.flurzicommit.com/landing'],['cinema','https://flurzicinema.com/'],['endnovel','https://endnovel-flurzi.com/']];
for(const [id,url] of products){
 const context=await browser.newContext({viewport:{width:1440,height:1040},deviceScaleFactor:1,reducedMotion:'reduce'});
 const page=await context.newPage();
 try{
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForTimeout(5500);
  const essential=page.getByRole('button',{name:/^(Save settings|Essential only)$/i}).first();
  if(await essential.isVisible())await essential.click();
  await page.evaluate(()=>{
   document.querySelectorAll('video').forEach(v=>v.pause());
   // Hide only local cookie overlay UI for a clean reference capture.
   for(const el of document.querySelectorAll('body *')){
    if(!(el instanceof HTMLElement)||getComputedStyle(el).position!=='fixed')continue;
    if(/We use cookies|Cookie settings|Optional analytics/.test(el.innerText)&&el.innerText.length<2000)el.style.visibility='hidden';
   }
  });
  await page.waitForTimeout(300);
  await sharp(await page.screenshot({animations:'disabled'})).webp({quality:85}).toFile('public/media/'+id+'.webp');
  console.log(id+': captured '+await page.title());
 }catch(error){console.error(id,error.message);process.exitCode=1;}
 await context.close();
}
await browser.close();
