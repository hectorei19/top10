// Helpers shared by Connections and Top 10 (Borderline has its own): page header, toast, info box,
// daily key and number, seeds, streaks and sharing the result.
const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const $=id=>document.getElementById(id);
const app=$('app'),layer=$('layer');
// hidden test mode, as in Borderline: ?test&day=2026-11-20 plays that day's puzzle (results are not saved)
const TESTQ=(()=>{try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}})();
const TESTDAY=TESTQ.has('test')&&/^\d{4}-\d{2}-\d{2}$/.test(TESTQ.get('day')||'')?TESTQ.get('day'):null;
function todayKey(){if(TESTDAY)return TESTDAY;const p=madridParts(Date.now());return p.year+'-'+p.month+'-'+p.day}
const dayNum=(key,first)=>Math.round((Date.parse(key+'T00:00Z')-Date.parse(first+'T00:00Z'))/864e5)+1;
function msToNextDay(){const p=madridParts(Date.now());return (24*3600-(+p.hour*3600+ +p.minute*60+ +p.second))*1000}
const nextIn=()=>{const ms=msToNextDay();return `${Math.floor(ms/36e5)} h ${Math.floor(ms%36e5/6e4)} min`};
// the same seed for everyone on a given day
function seedOf(str){let h=2166136261;for(const ch of str){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h}
function load(k,def){try{const v=JSON.parse(localStorage.getItem(k)||'null');return v==null?def:v}catch(e){return def}}
function store(k,v){if(TESTDAY&&k!=='cx-free'&&k!=='t10-free')return;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
// days played in a row, ending today (or yesterday when today is not played yet)
function streakOf(hist){const day=k=>Math.round(Date.parse(k+'T12:00Z')/864e5),set=new Set(Object.keys(hist).map(day));
  let d=set.has(day(todayKey()))?day(todayKey()):day(todayKey())-1,n=0;while(set.has(d)){n++;d--}return n}

let toastT=null,toastMsg=null;
function toast(msg,kind){toastMsg={msg,kind};clearTimeout(toastT);toastT=setTimeout(()=>{toastMsg=null;drawToast()},2200);drawToast()}
function drawToast(){let el=$('toastbox');if(!el){el=document.createElement('div');el.id='toastbox';document.body.appendChild(el)}
  el.innerHTML=toastMsg?`<div class="toast ${toastMsg.kind||''}" role="status">${esc(toastMsg.msg)}</div>`:''}
// a dialog over the page (rules, a category's meaning); closes with its button, the scrim or Escape
function dialog(title,html,label){layer.innerHTML=`<div class="infoscrim" id="dscrim"></div><div class="infobox helpbox" role="dialog" aria-modal="true" aria-labelledby="dlgt"><h2 id="dlgt">${title}</h2>${html}<button class="primary" id="dok">${label||'Got it'}</button></div>`;
  const close=()=>{layer.innerHTML=''};$('dok').onclick=$('dscrim').onclick=close;$('dok').focus()}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('dok'))layer.innerHTML=''});
function header(brand,coord){return `<header class="top mini-top"><span class="tl">${gamesBtn()}<h1 class="brand">${brand}</h1></span><span class="coord">${esc(coord)}</span><button class="helpbtn" id="rules">How to play</button></header>`}

// phones: the system share menu; elsewhere copy the result and the link (if the clipboard is blocked, select the text)
const TOUCH=matchMedia('(pointer:coarse)').matches;
function share(text){
  const manual=()=>{const el=$('share');if(el){el.textContent=text;const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r)}
    let ok=false;try{ok=document.execCommand('copy')}catch(e){}toast(ok?'Result and link copied.':'Copy blocked here. The text is selected: copy it manually.',ok?'good':'')};
  if(navigator.share&&TOUCH){navigator.share({text}).catch(e=>{if(e&&e.name!=='AbortError')manual()});return}
  try{navigator.clipboard.writeText(text).then(()=>toast('Result and link copied.','good'),manual)}catch(e){manual()}}
const pageLink=q=>location.origin+location.pathname+(q||'');
