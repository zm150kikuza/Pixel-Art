(() => {
  const palettes = {
    original: [], gameboy: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"],
    nes: ["#1d2b53", "#7e2553", "#ab5236", "#008751", "#5f574f", "#c2c3c7", "#fff1e8", "#ff004d", "#ffa300", "#ffec27", "#00e436", "#29adff"],
    arcade: ["#130f40", "#4b31a7", "#e84393", "#ff7675", "#fdcb6e", "#55efc4", "#00cec9"],
    pastel: ["#3b3158", "#7468a3", "#f3b7cf", "#f5d6ba", "#f8eecc", "#b9ddd0", "#91b2d0"],
    mono: ["#161616", "#545454", "#9a9a9a", "#dedede", "#ffffff"]
  };
  const input = document.querySelector('#imageInput'); const canvas = document.querySelector('#previewCanvas');
  const preview = canvas.getContext('2d'); const source = document.createElement('canvas'); const sourceCtx = source.getContext('2d', { willReadFrequently: true });
  const pixelSize = document.querySelector('#pixelSize'); const sizeOut = document.querySelector('#pixelSizeOutput'); const palette = document.querySelector('#palette');
  const grayscale = document.querySelector('#grayscale'); const swatches = document.querySelector('#swatches'); const status = document.querySelector('#imageStatus'); const dropZone = document.querySelector('#dropZone');
  let originalName = 'pixel-art';

  function drawDemo() { source.width = 640; source.height = 480; const g = sourceCtx.createLinearGradient(0,0,640,480); g.addColorStop(0,'#ffbe66'); g.addColorStop(.5,'#e96d83'); g.addColorStop(1,'#4d3b91'); sourceCtx.fillStyle=g; sourceCtx.fillRect(0,0,640,480); sourceCtx.fillStyle='#ffd97c'; sourceCtx.beginPath(); sourceCtx.arc(360,155,70,0,Math.PI*2); sourceCtx.fill(); sourceCtx.fillStyle='#302353'; sourceCtx.fillRect(0,335,640,145); sourceCtx.fillStyle='#513674'; for(let i=0;i<18;i++) sourceCtx.fillRect(i*42,290+(i%3)*18,52,80); sourceCtx.fillStyle='#fcf0c2'; [[110,116],[171,207],[285,90],[474,90],[540,192]].forEach(([x,y])=>sourceCtx.fillRect(x,y,8,8)); }
  function nearest(r,g,b, colours) { let best=colours[0], score=Infinity; for (const hex of colours) { const n=parseInt(hex.slice(1),16), pr=n>>16, pg=(n>>8)&255, pb=n&255; const d=(r-pr)**2+(g-pg)**2+(b-pb)**2; if(d<score){score=d;best=hex;} } const n=parseInt(best.slice(1),16); return [n>>16,(n>>8)&255,n&255]; }
  function render() { if(!source.width) return; const step=Number(pixelSize.value); sizeOut.value=`${step} px`; const scale=Math.min(1, 720/source.width, 560/source.height); const w=Math.max(1,Math.round(source.width*scale)), h=Math.max(1,Math.round(source.height*scale)); const smallW=Math.max(1,Math.round(w/step)), smallH=Math.max(1,Math.round(h/step)); const tiny=document.createElement('canvas'); tiny.width=smallW;tiny.height=smallH; const t=tiny.getContext('2d',{willReadFrequently:true}); t.imageSmoothingEnabled=true;t.drawImage(source,0,0,smallW,smallH); const data=t.getImageData(0,0,smallW,smallH); const selected=palettes[palette.value]; for(let i=0;i<data.data.length;i+=4){let r=data.data[i],g=data.data[i+1],b=data.data[i+2]; if(grayscale.checked){const l=Math.round(.299*r+.587*g+.114*b);r=g=b=l;} if(selected.length){[r,g,b]=nearest(r,g,b,selected);} data.data[i]=r;data.data[i+1]=g;data.data[i+2]=b;} t.putImageData(data,0,0); canvas.width=w;canvas.height=h; preview.imageSmoothingEnabled=false;preview.clearRect(0,0,w,h);preview.drawImage(tiny,0,0,w,h); }
  function updateSwatches(){swatches.innerHTML=''; const colours=palettes[palette.value]; if(!colours.length){swatches.innerHTML='<span style="font-size:11px;color:#9ca3b3">Full colour</span>';return;} colours.forEach(c=>{const s=document.createElement('i');s.style.background=c;swatches.append(s);});}
  function loadFile(file) { if(!file || !file.type.startsWith('image/')) return; const reader=new FileReader(); reader.onload=e=>{const img=new Image();img.onload=()=>{source.width=img.naturalWidth;source.height=img.naturalHeight;sourceCtx.drawImage(img,0,0);originalName=file.name.replace(/\.[^.]+$/,'')||'pixel-art';status.textContent=`${img.naturalWidth} × ${img.naturalHeight} image`;render();};img.src=e.target.result;};reader.readAsDataURL(file); }
  input.addEventListener('change',()=>loadFile(input.files[0])); [pixelSize,palette,grayscale].forEach(el=>el.addEventListener('input',()=>{updateSwatches();render();}));
  ['dragenter','dragover'].forEach(type=>dropZone.addEventListener(type,e=>{e.preventDefault();dropZone.classList.add('dragging');})); ['dragleave','drop'].forEach(type=>dropZone.addEventListener(type,e=>{e.preventDefault();dropZone.classList.remove('dragging');})); dropZone.addEventListener('drop',e=>loadFile(e.dataTransfer.files[0]));
  document.querySelector('#resetButton').addEventListener('click',()=>{pixelSize.value=12;palette.value='original';grayscale.checked=false;input.value='';updateSwatches();render();});
  document.querySelector('#downloadButton').addEventListener('click',()=>{const link=document.createElement('a');link.download=`${originalName}-pixel-art.png`;link.href=canvas.toDataURL('image/png');link.click();});
  drawDemo();updateSwatches();render();
})();
