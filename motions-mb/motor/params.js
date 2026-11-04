const fs=require('fs'),path=require('path');const dir=process.argv[2];
const out={};global.window={};global.MB={def:(id,p)=>{out[id]=p;},rich:x=>x};global.document={};global.gsap={};
for(const f of fs.readdirSync(dir).filter(f=>/^[A-Z]-.*\.js$/.test(f)).sort()){const src=fs.readFileSync(path.join(dir,f),'utf8');
 try{eval(src)}catch(e){console.error(f,e.message)}
 for(const m of src.matchAll(/\/\/ -+ (\d\d|(?:px|lux)-[a-z]+) +(.+?) -+[^\n]*\n((?:[ \t]*\/\/[^\n]*\n)*)/g)){const o=(out[m[1]]=out[m[1]]||{});o.__titulo=m[2];o.__arquivo=f;
  const nota=m[3].split('\n').map(l=>l.replace(/^\s*\/\/\s?/,'').trim()).filter(Boolean).join('\n');if(nota)o.__nota=nota;}}
console.log(JSON.stringify(out));
