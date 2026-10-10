import {chromium} from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
fs.mkdirSync('screenshots/junca-motion',{recursive:true});
await page.goto('https://juncastudio.com/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(10000);
await page.screenshot({path:'screenshots/junca-motion/arrival.png'});
await page.mouse.move(1250,300);await page.waitForTimeout(1200);await page.screenshot({path:'screenshots/junca-motion/pointer.png'});
const buttons=await page.locator('button').evaluateAll(els=>els.map(el=>({text:el.innerText,label:el.getAttribute('aria-label'),class:el.className})));
fs.writeFileSync('screenshots/junca-motion/buttons.json',JSON.stringify(buttons,null,2));console.log('Buttons',JSON.stringify(buttons).slice(0,1800));
for(const [i,y] of [[1,1000],[2,1900],[3,3200],[4,4800],[5,6200]]){
 await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(1600);
 await page.screenshot({path:'screenshots/junca-motion/scroll-'+i+'.png'});
 console.log('Scroll',i,await page.evaluate(()=>window.scrollY));
}
await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(1000);
const menu=page.locator('button[aria-label*="menu" i]').first();
if(await menu.count()){await menu.click();await page.waitForTimeout(700);await page.screenshot({path:'screenshots/junca-motion/menu.png'});}
await browser.close();
