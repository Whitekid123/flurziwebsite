const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{for(const [name,url] of [['microdose','https://microdose.studio/'],['loopsii','https://loopsii.com/'],['aesthetic','https://sc-aesthetic-labs.com/']]){
const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(6000);
await p.screenshot({path:'screenshots/references-nov15/'+name+'-browser.png'});
const evidence=await p.evaluate(()=>({height:document.documentElement.scrollHeight,headings:[...document.querySelectorAll('h1,h2')].slice(0,12).map(el=>({text:el.textContent,size:getComputedStyle(el).fontSize})),canvas:document.querySelectorAll('canvas').length,video:[...document.querySelectorAll('video')].map(el=>({src:el.currentSrc,autoplay:el.autoplay})),animations:document.getAnimations().slice(0,12).map(a=>({name:a.animationName,state:a.playState,duration:a.effect?.getTiming().duration})),scripts:[...document.scripts].map(s=>s.src).filter(Boolean)}));
fs.writeFileSync('screenshots/references-nov15/'+name+'-evidence.json',JSON.stringify(evidence,null,2));
for(const n of [1,2]){await p.mouse.wheel(0,850);await p.waitForTimeout(2000);await p.screenshot({path:'screenshots/references-nov15/'+name+'-scroll-'+n+'.png'});}
console.log(name,JSON.stringify(evidence));await p.close();
}}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1;});