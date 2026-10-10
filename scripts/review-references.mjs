import {chromium} from 'playwright';
import fs from 'node:fs';
import sharp from 'sharp';
fs.mkdirSync('screenshots/references',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const sites=[['junca','https://juncastudio.com/'],['mirage','https://studiomirage.io/'],['armor','https://www.armor-bd.com/'],['cypher','https://www.cyphercapital.com/'],['hitit','https://hitit.com/'],['sixes','https://sixescricket.com/']];
for(const [name,url] of sites){
 const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});
 const page=await context.newPage();
 try{
  console.log('Opening '+name);
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(5000);
  for(const label of [/^reject all$/i,/^essential only$/i,/^decline$/i,/^accept all cookies$/i]){
   const button=page.getByRole('button',{name:label}).first();if(await button.isVisible())await button.click().catch(()=>{});
  }
  console.log(name+' loaded');
  const data={url,title:await page.title(),headings:await page.locator('h1,h2').allTextContents()};
  const shots=[];
  for(let i=0;i<3;i++){
   if(i){await page.mouse.wheel(0,800);await page.waitForTimeout(1800);}
   const b=await page.screenshot({timeout:20000});await fs.promises.writeFile('screenshots/references/'+name+'-'+i+'.png',b);shots.push(await sharp(b).resize(640,400).toBuffer());console.log(name+' captured '+i);
  }
  await sharp({create:{width:1920,height:400,channels:3,background:'#151515'}}).composite(shots.map((input,i)=>({input,left:i*640,top:0}))).png().toFile('screenshots/references/'+name+'-review.png');
  await fs.promises.writeFile('screenshots/references/'+name+'.json',JSON.stringify(data,null,2));
 }catch(e){console.log(name,'FAILED',e.message);}
 await context.close();
}
await browser.close();
