const points=[
 {id:"loc-vice",name:"Vice City",type:"location",x:58,y:42,icon:"⌂",desc:"Schematischer Beispielmarker für Vice City. Keine bestätigten Ingame-Koordinaten."},
 {id:"loc-coast",name:"Küstenstraße",type:"location",x:37,y:68,icon:"⌂",desc:"Demo-Punkt für ein Gebiet. Kein bestätigter Ingame-Fundort."},
 {id:"veh-a",name:"Fahrzeug-Spot A",type:"vehicle",x:66,y:58,icon:"▰",desc:"Platzhalter für einen später verifizierten Fahrzeugfund."},
 {id:"wep-a",name:"Waffenfund A",type:"weapon",x:46,y:34,icon:"✦",desc:"Platzhalter für einen später verifizierten Waffenfund."},
 {id:"mis-a",name:"Missionsstart A",type:"mission",x:27,y:49,icon:"◆",desc:"Platzhalter für einen Missionsmarker."},
 {id:"sec-a",name:"Geheimnis A",type:"secret",x:78,y:30,icon:"?",desc:"Platzhalter für ein Easter Egg oder eine versteckte Location."}
];
let activeType="all",zoom=1,offsetX=0,offsetY=0,drag=null,selectedId=null;
const map=document.querySelector("#map"),world=document.querySelector("#mapWorld"),pins=document.querySelector("#pins");
const search=document.querySelector("#search"),detail=document.querySelector("#detail");
const typeNames={location:"ORT",vehicle:"FAHRZEUG",weapon:"WAFFE",mission:"MISSION",secret:"GEHEIMNIS"};
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
 const q=search.value.trim().toLowerCase();
 const visible=points.filter(p=>(activeType==="all"||p.type===activeType)&&(p.name+" "+p.desc).toLowerCase().includes(q));
 pins.innerHTML="";
 visible.forEach(p=>{
  const b=document.createElement("button");
  b.type="button";b.className="pin "+p.type+(selectedId===p.id?" selected":"");
  b.style.left=p.x+"%";b.style.top=p.y+"%";b.textContent=p.icon;b.title=p.name;
  b.setAttribute("aria-label",p.name);
  b.addEventListener("click",()=>selectPoint(p));
  pins.append(b);
 });
 document.querySelector("#count").textContent=visible.length+" von "+points.length+" Demo-Einträgen angezeigt";
 document.querySelectorAll("#filters button").forEach(btn=>{
  const t=btn.dataset.type;
  let count=t==="all"?points.length:points.filter(p=>p.type===t).length;
  let badge=btn.querySelector(".filter-count");
  if(!badge){badge=document.createElement("span");badge.className="filter-count";btn.append(badge);}
  badge.textContent=count;
 });
}
function selectPoint(p){
 selectedId=p.id;
 document.querySelectorAll(".pin").forEach(b=>b.classList.toggle("selected",b.title===p.name));
 detail.innerHTML="<small>"+typeNames[p.type]+" / DEMO-EINTRAG</small><h3>"+safe(p.name)+"</h3><p>"+safe(p.desc)+"</p><span class='detail-status'>NICHT VERIFIZIERT</span>";
}
function resetDetail(){selectedId=null;detail.innerHTML="<small>ATLAS-EINTRAG</small><h3>Wähle einen Kartenpunkt</h3><p>Beschreibung, Fundhinweise und Quellen erscheinen hier.</p>";}
function applyTransform(){world.style.transform="translate("+offsetX+"px,"+offsetY+"px) scale("+zoom+")";}
function setZoom(next){zoom=Math.max(.75,Math.min(2.25,next));applyTransform();}
document.querySelectorAll("#filters button").forEach(btn=>btn.addEventListener("click",()=>{
 activeType=btn.dataset.type;
 document.querySelectorAll("#filters button").forEach(b=>b.classList.toggle("active",b===btn));
 resetDetail();render();
}));
search.addEventListener("input",()=>{selectedId=null;render();});
document.querySelector("#reset").addEventListener("click",()=>{
 activeType="all";search.value="";
 document.querySelectorAll("#filters button").forEach(b=>b.classList.toggle("active",b.dataset.type==="all"));
 resetDetail();render();
});
document.querySelector("#plus").addEventListener("click",()=>setZoom(zoom+.15));
document.querySelector("#minus").addEventListener("click",()=>setZoom(zoom-.15));
document.querySelector("#center").addEventListener("click",()=>{zoom=1;offsetX=0;offsetY=0;applyTransform();});
map.addEventListener("pointerdown",e=>{
 if(e.target.closest(".pin"))return;
 if(e.pointerType==="mouse"&&e.button!==0)return;
 drag={x:e.clientX,y:e.clientY,ox:offsetX,oy:offsetY,moved:false};
 map.classList.add("dragging");map.setPointerCapture(e.pointerId);
});
map.addEventListener("pointermove",e=>{
 if(!drag)return;
 const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
 if(Math.abs(dx)+Math.abs(dy)>3)drag.moved=true;
 offsetX=drag.ox+dx;offsetY=drag.oy+dy;applyTransform();
});
function stopDrag(){drag=null;map.classList.remove("dragging");}
map.addEventListener("pointerup",stopDrag);map.addEventListener("pointercancel",stopDrag);
map.addEventListener("wheel",e=>{e.preventDefault();setZoom(zoom+(e.deltaY<0?.08:-.08));},{passive:false});
document.querySelector("#menu").addEventListener("click",()=>document.querySelector("#nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("#nav").classList.remove("open")));
document.querySelector("#year").textContent=new Date().getFullYear();
render();applyTransform();
/* Personal completion tracker: saved in this browser only */
(function initCompletionTracker(){
 const checks=[...document.querySelectorAll("[data-progress]")];
 const fill=document.querySelector("#progressFill");
 const percent=document.querySelector("#trackerPercent");
 const count=document.querySelector("#trackerCount");
 const reset=document.querySelector("#trackerReset");
 if(!checks.length||!fill||!percent||!count||!reset)return;
 const storageKey="vicecitywire-completion-v1";
 let saved={};
 try{saved=JSON.parse(localStorage.getItem(storageKey)||"{}")||{};}catch(e){saved={};}
 function update(save=true){
  const done=checks.filter(c=>c.checked).length;
  const pct=Math.round(done/checks.length*100);
  fill.style.width=pct+"%";
  percent.textContent=pct+"% COMPLETE";
  count.textContent=done+" / "+checks.length+" Kategorien erledigt";
  if(save){
   const state={};checks.forEach(c=>state[c.dataset.progress]=c.checked);
   try{localStorage.setItem(storageKey,JSON.stringify(state));}catch(e){}
  }
 }
 checks.forEach(c=>{c.checked=Boolean(saved[c.dataset.progress]);c.addEventListener("change",()=>update(true));});
 reset.addEventListener("click",()=>{
  checks.forEach(c=>c.checked=false);
  try{localStorage.removeItem(storageKey);}catch(e){}
  update(false);
 });
 update(false);
})();
/* Searchable starter catalogues. Scope is deliberately limited to sourced edition items. */
(function initCatalogues(){
 const vehicles=[
  {name:"'55 Vapid Stanier",type:"car",label:"Klassische Limousine",source:"Vintage Vice City Pack",note:"Als Vorbestellerbonus mit Garage beschrieben."},
  {name:"'95 Grotti Cheetah",type:"car",label:"Sportwagen",source:"Ultimate Edition",note:"Als exklusives Fahrzeug der Ultimate Edition beschrieben."},
  {name:"'67 Vapid Dominator Buggy",type:"car",label:"Beach Buggy",source:"Ultimate Edition",note:"Als exklusives Fahrzeug der Ultimate Edition beschrieben."},
  {name:"Dinka Enduro",type:"bike",label:"Geländemotorrad",source:"Ultimate Edition",note:"Als exklusives Fahrzeug der Ultimate Edition beschrieben."},
  {name:"Shitzu Squalo",type:"boat",label:"Speedboat",source:"Ultimate Edition",note:"Als exklusives Wasserfahrzeug der Ultimate Edition beschrieben."},
  {name:"Crest Kayak",type:"other",label:"Kajak",source:"Ultimate Edition",note:"Als exklusives Wasserfahrzeug der Ultimate Edition beschrieben."}
 ];
 const weapons=[
  {name:"Girardi ES9",type:"pistol",label:"Pistole",source:"Ultimate Edition",note:"Personalisierte Variante in den Editionsinhalten genannt."},
  {name:"Klose K17",type:"pistol",label:"Pistole",source:"Ultimate Edition",note:"Personalisierte Variante in den Editionsinhalten genannt."},
  {name:"Hawk & Little Morgan",type:"revolver",label:"Revolver",source:"Ultimate Edition",note:"Revolver-Inhalt der Ultimate Edition."}
 ];
 function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
 function mount(config){
  const grid=document.getElementById(config.grid),search=document.getElementById(config.search),select=document.getElementById(config.select);
  if(!grid||!search||!select)return;
  function render(){
   const q=search.value.trim().toLowerCase(),kind=select.value;
   const items=config.items.filter(x=>(kind==="all"||x.type===kind)&&(x.name+" "+x.label+" "+x.note).toLowerCase().includes(q));
   if(!items.length){grid.innerHTML='<div class="db-empty">Keine passenden Einträge gefunden. Ändere den Suchbegriff oder den Filter.</div>';return;}
   grid.innerHTML=items.map(x=>'<article class="db-card"><div class="db-card-top"><span class="db-type">'+escapeText(x.label)+'</span><span class="db-status">QUELLENBASIERT</span></div><h3>'+escapeText(x.name)+'</h3><p>'+escapeText(x.note)+'</p><div class="db-meta">DATENBASIS: '+escapeText(x.source.toUpperCase())+'</div></article>').join("");
  }
  search.addEventListener("input",render);select.addEventListener("change",render);render();
 }
 mount({grid:"vehicleGrid",search:"vehicleSearch",select:"vehicleType",items:vehicles});
 mount({grid:"weaponGrid",search:"weaponSearch",select:"weaponType",items:weapons});
})();