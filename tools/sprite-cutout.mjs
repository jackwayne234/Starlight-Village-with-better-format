// Reusable sprite cleaner: takes a ChatGPT/Image PNG on a white background,
// flood-fills the white background to transparent (from the edges, so white
// highlights inside the art are kept), softens the rim, trims to content,
// and writes an RGBA PNG. Usage: node tools/sprite-cutout.mjs in.png out.png [threshold]
import fs from 'fs';
import zlib from 'zlib';

function decode(file){
  const buf=fs.readFileSync(file); let p=8,ihdr=null,idat=[];
  while(p<buf.length){const len=buf.readUInt32BE(p),type=buf.toString('ascii',p+4,p+8),data=buf.subarray(p+8,p+8+len);
    if(type==='IHDR')ihdr={w:data.readUInt32BE(0),h:data.readUInt32BE(4),bd:data[8],ct:data[9]};
    if(type==='IDAT')idat.push(data); if(type==='IEND')break; p+=12+len;}
  const ch=ihdr.ct===6?4:ihdr.ct===2?3:1, {w,h}=ihdr, stride=w*ch;
  const raw=zlib.inflateSync(Buffer.concat(idat)), out=Buffer.alloc(h*stride); let pos=0;
  const pae=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
  for(let y=0;y<h;y++){const ft=raw[pos++];for(let x=0;x<stride;x++){const rb=raw[pos++];
    const a=x>=ch?out[y*stride+x-ch]:0,b=y>0?out[(y-1)*stride+x]:0,c=(x>=ch&&y>0)?out[(y-1)*stride+x-ch]:0;
    let v;if(ft===0)v=rb;else if(ft===1)v=rb+a;else if(ft===2)v=rb+b;else if(ft===3)v=rb+((a+b)>>1);else v=rb+pae(a,b,c);
    out[y*stride+x]=v&255;}}
  return {w,h,ch,data:out};
}

function encode(w,h,rgba){
  const stride=w*4, raw=Buffer.alloc(h*(stride+1));
  for(let y=0;y<h;y++){raw[y*(stride+1)]=0;rgba.copy(raw,y*(stride+1)+1,y*stride,y*stride+stride);}
  const comp=zlib.deflateSync(raw,{level:9});
  const chunk=(type,data)=>{const c=Buffer.alloc(12+data.length);c.writeUInt32BE(data.length,0);c.write(type,4,'ascii');
    data.copy(c,8);c.writeUInt32BE(zlib.crc32(c.subarray(4,8+data.length))>>>0,8+data.length);return c;};
  const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',comp),chunk('IEND',Buffer.alloc(0))]);
}

const [,,inF,outF,thr='236']=process.argv;
const T=+thr;
const {w,h,ch,data}=decode(inF);
const rgba=Buffer.alloc(w*h*4);
for(let i=0;i<w*h;i++){const s=i*ch;rgba[i*4]=data[s];rgba[i*4+1]=data[s+1];rgba[i*4+2]=data[s+2];rgba[i*4+3]=255;}
// flood fill background (whitish + reachable from border) -> alpha 0
const isWhite=i=>{const r=rgba[i*4],g=rgba[i*4+1],b=rgba[i*4+2];return Math.min(r,g,b)>=T;};
const bg=new Uint8Array(w*h), stack=[];
for(let x=0;x<w;x++){stack.push(x,(h-1)*w+x);} for(let y=0;y<h;y++){stack.push(y*w,y*w+w-1);}
while(stack.length){const i=stack.pop();if(bg[i]||!isWhite(i))continue;bg[i]=1;rgba[i*4+3]=0;
  const x=i%w,y=(i/w)|0;
  if(x>0)stack.push(i-1);if(x<w-1)stack.push(i+1);if(y>0)stack.push(i-w);if(y<h-1)stack.push(i+w);}
// feather: kept pixels touching bg get partial alpha if light (softens white halo)
const soft=Buffer.from(rgba);
for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(bg[i]||rgba[i*4+3]===0)continue;
  let edge=false;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;if(bg[ny*w+nx]){edge=true;break;}}
  if(edge){const mn=Math.min(rgba[i*4],rgba[i*4+1],rgba[i*4+2]);if(mn>=T-20){soft[i*4+3]=Math.max(0,Math.round(255*(T-mn)/20));}}}
soft.copy(rgba);
// trim to content bbox
let minX=w,minY=h,maxX=0,maxY=0;
for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(rgba[(y*w+x)*4+3]>8){if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;}
const pad=4;minX=Math.max(0,minX-pad);minY=Math.max(0,minY-pad);maxX=Math.min(w-1,maxX+pad);maxY=Math.min(h-1,maxY+pad);
const tw=maxX-minX+1,th=maxY-minY+1,tr=Buffer.alloc(tw*th*4);
for(let y=0;y<th;y++)rgba.copy(tr,y*tw*4,((y+minY)*w+minX)*4,((y+minY)*w+minX)*4+tw*4);
fs.writeFileSync(outF,encode(tw,th,tr));
console.log(`${inF} ${w}x${h} -> ${outF} ${tw}x${th} (trimmed, transparent)`);
