import {chromium} from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('docs/source-audit',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const legal={};let faq=[];
for(const slug of ['','products','about','faq','contact','privacy-policy','terms','disclaimer','data-protection']){
 await page.goto('https://www.flurzi.com/'+slug,{waitUntil:'domcontentloaded',timeout:45000});
 const data=await page.evaluate(()=>({url:location.href,title:document.title,text:(document.querySelector('main')||document.body).innerText,nodes:[...(document.querySelector('main')||document.body).querySelectorAll('h1,h2,h3,p')].map(e=>({tag:e.tagName,text:e.textContent.trim()})),links:[...document.querySelectorAll('a[href]')].map(e=>({text:e.textContent.trim(),href:e.href}))}));
 fs.writeFileSync('docs/source-audit/'+(slug||'home')+'.json',JSON.stringify(data,null,2));
 if(['privacy-policy','terms','disclaimer','data-protection'].includes(slug)){
  const start=data.nodes.findIndex(n=>n.tag==='H1');const nodes=data.nodes.slice(start+1);const sections=[];let current;
  for(const n of nodes){if(n.tag==='H2'){current={title:n.text,paragraphs:[]};sections.push(current);}else if(n.tag==='P'&&current)current.paragraphs.push(n.text);}
  legal[slug]={title:data.nodes[start].text,intro:nodes.find(n=>n.tag==='P')?.text||'',sections,source:data.url};
 }
 if(slug==='faq'){let group='Flurzi',question;for(const n of data.nodes){if(n.tag==='H2')group=n.text;if(n.tag==='H3')question=n.text;if(n.tag==='P'&&question){faq.push({group,question,answer:n.text});question=undefined;}}}
 console.log('Audited /'+slug);
}
fs.writeFileSync('lib/legal-content.json',JSON.stringify(legal,null,2));
fs.writeFileSync('lib/faq-content.json',JSON.stringify(faq,null,2));
await page.goto('https://www.flurzicommit.com/landing',{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(2000);
fs.writeFileSync('docs/source-audit/commit-current.txt',await page.locator('body').innerText());
await page.goto('https://juncastudio.com/',{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(12000);
await page.screenshot({path:'screenshots/references/junca-clean-hero.png',timeout:30000});
await page.mouse.wheel(0,1600);await page.waitForTimeout(2500);
await page.screenshot({path:'screenshots/references/junca-clean-content.png',timeout:30000});
console.log('Junca visual review captured');
await browser.close();
