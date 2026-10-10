const fs=require('fs');const path=require('path');
const files=fs.readdirSync('.next/static/chunks',{recursive:true}).filter(p=>p.endsWith('.js'));
const match=files.filter(p=>fs.readFileSync(path.join('.next/static/chunks',p),'utf8').includes('"seeked"'));
console.log('Built scroll-media seek synchronization:',match.length>0?'present':'MISSING');
if(!match.length)process.exitCode=1;
if(fs.existsSync('x')&&fs.statSync('x').size===0)fs.unlinkSync('x');
