const fs=require('fs'),path=require('path');const dir=process.argv[2];
const out={};global.window={};global.MB={def:(id,p)=>{out[id]=p;},rich:x=>x};global.document={};global.gsap={};
for(const f of fs.readdirSync(dir).filter(f=>/^[A-G]-.*\.js$/.test(f)).sort()){const src=fs.readFileSync(path.join(dir,f),'utf8');
 try{eval(src)}catch(e){console.error(f,e.message)}
 for(const m of src.matchAll(/\/\/ -+ (\d\d) (.+?) -+/g)){(out[m[1]]=out[m[1]]||{}).__titulo=m[2];out[m[1]].__arquivo=f;}}
console.log(JSON.stringify(out));
