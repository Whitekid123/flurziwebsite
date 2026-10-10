const fs=require('fs');
const file='components/HomeExperience.tsx';
let source=fs.readFileSync(file,'utf8');
source=source.replace('const update=()=>{\n   try','const update=()=>{\n   setSceneReady(false);\n   try');
fs.writeFileSync(file,source);
console.log('Hero fallback now also resets when the viewport or motion preference changes.');
