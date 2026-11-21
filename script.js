const points=[
 {id:"loc-vice",name:"Vice City",type:"location",x:58,y:42,icon:"⌂",desc:"Schematic example marker for Vice City. Not a verified in-game coordinate."},
 {id:"loc-coast",name:"Küstenstraße",type:"location",x:37,y:68,icon:"⌂",desc:"Demo marker for a region. Not a verified in-game location."},
 {id:"veh-a",name:"Vehicle Spot A",type:"vehicle",x:66,y:58,icon:"▰",desc:"Placeholder for a vehicle location to be verified."},
 {id:"wep-a",name:"Weapon Location A",type:"weapon",x:46,y:34,icon:"✦",desc:"Placeholder for a weapon location to be verified."},
 {id:"mis-a",name:"Missionsstart A",type:"mission",x:27,y:49,icon:"◆",desc:"Placeholder for a mission marker."},
 {id:"sec-a",name:"Secret A",type:"secret",x:78,y:30,icon:"?",desc:"Placeholder for an Easter egg or hidden location."}
];
let activeType="all",zoom=1,offsetX=0,offsetY=0,drag=null,selectedId=null;
const map=document.querySelector("#map"),world=document.querySelector("#mapWorld"),pins=document.querySelector("#pins");
const search=document.querySelector("#search"),detail=document.querySelector("#detail");
const typeNames={location:"LOCATION",vehicle:"VEHICLE",weapon:"WEAPON",mission:"MISSION",secret:"SECRET"};
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
 document.querySelector("#count").textContent=visible.length+" of "+points.length+" demo entries shown";
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
 detail.innerHTML="<small>"+typeNames[p.type]+" / DEMO ENTRY</small><h3>"+safe(p.name)+"</h3><p>"+safe(p.desc)+"</p><span class='detail-status'>NOT VERIFIED</span>";
}
function resetDetail(){selectedId=null;detail.innerHTML="<small>ATLAS ENTRY</small><h3>Select a map marker</h3><p>Descriptions, discovery notes and sources will appear here.</p>";}
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
  count.textContent=done+" / "+checks.length+" categories completed";
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
  {name:"'55 Vapid Stanier",type:"car",label:"Classic sedan",source:"Vintage Vice City Pack",note:"Listed as a pre-order bonus with a garage."},
  {name:"'95 Grotti Cheetah",type:"car",label:"Sports car",source:"Ultimate Edition",note:"Listed as an Ultimate Edition exclusive vehicle."},
  {name:"'67 Vapid Dominator Buggy",type:"car",label:"Beach buggy",source:"Ultimate Edition",note:"Listed as an Ultimate Edition exclusive vehicle."},
  {name:"Dinka Enduro",type:"bike",label:"Off-road motorcycle",source:"Ultimate Edition",note:"Listed as an Ultimate Edition exclusive vehicle."},
  {name:"Shitzu Squalo",type:"boat",label:"Speedboat",source:"Ultimate Edition",note:"Listed as an exclusive watercraft in the Ultimate Edition."},
  {name:"Crest Kayak",type:"other",label:"Kayak",source:"Ultimate Edition",note:"Listed as an exclusive watercraft in the Ultimate Edition."}
 ];
 const weapons=[
  {name:"Girardi ES9",type:"pistol",label:"Pistol",source:"Ultimate Edition",note:"Custom variant named in the edition content."},
  {name:"Klose K17",type:"pistol",label:"Pistol",source:"Ultimate Edition",note:"Custom variant named in the edition content."},
  {name:"Hawk & Little Morgan",type:"revolver",label:"Revolver",source:"Ultimate Edition",note:"Revolver item included in the Ultimate Edition."}
 ];
 function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
 function mount(config){
  const grid=document.getElementById(config.grid),search=document.getElementById(config.search),select=document.getElementById(config.select);
  if(!grid||!search||!select)return;
  function render(){
   const q=search.value.trim().toLowerCase(),kind=select.value;
   const items=config.items.filter(x=>(kind==="all"||x.type===kind)&&(x.name+" "+x.label+" "+x.note).toLowerCase().includes(q));
   if(!items.length){grid.innerHTML='<div class="db-empty">No matching entries. Try another search term or filter.</div>';return;}
   grid.innerHTML=items.map(x=>'<article class="db-card"><div class="db-card-top"><span class="db-type">'+escapeText(x.label)+'</span><span class="db-status">QUELLENBASIERT</span></div><h3>'+escapeText(x.name)+'</h3><p>'+escapeText(x.note)+'</p><div class="db-meta">DATENBASIS: '+escapeText(x.source.toUpperCase())+'</div></article>').join("");
  }
  search.addEventListener("input",render);select.addEventListener("change",render);render();
 }
 mount({grid:"vehicleGrid",search:"vehicleSearch",select:"vehicleType",items:vehicles});
 mount({grid:"weaponGrid",search:"weaponSearch",select:"weaponType",items:weapons});
})();
/* GTA VI mission index: titles from current third-party guide lists. */
(function initMissionLibrary(){
 const chapters=[
  {id:1,name:"Just Like Paradise",missions:[
   "Prologue","Gone Fishing","Gear Up","Just a Scratch","Lab Fees","Unwanted Attention","Pipework","Hey Arnold!","Island Dreams","Feng Shui","Coming Home","Buck Me","Clean Up After Donnie","Down to Earth","Clear Skies","Day Release","Swamped","Recalibration","Tourist Trap","Home Sweet Home","Discharge Time"
  ]},
  {id:2,name:"Paradise Lost",missions:[
   "What's in the Bag?","Ambulance Chaser","Just Moved In","Girls' Trip","Moses","Daily Driver","Slam Dunk","Breakfast Run","Coffee Break","Afternoon Delight","Thrillbillies","Twist Wrist, Smash, Grab","Checking Out"
  ]},
  {id:3,name:"Tits, Ass, Drug Money",missions:[
   "Welcome to Vice City","Dealer's Choice","Meet the Heders","Dubious Provenance","Mami Knows Best","South Leonida Real Estate","Tyrone","Here, Kitty Kitty","Kitty Litter Labs","Car Service","Top Billing","Boobie Time","First Impressions","Caught Slipping","Crosstown Traffic","Credit Check","Steal the Zorrusso for Randy","Sinfrontera National Bank","Security Expert","Ride or Die","Company Property","The Missing Link","Safe Word","Cooties","Bricked Up","Hidden Charges","The Cartel Heist"
  ]},
  {id:4,name:"Vice City, Baby",missions:[
   "Ocean Beach","Another Life","Company Cars","Lawyer Up","Party Hard","Heavy Lifting","Photo/Shoot","Making Gainz","Watch It","Cash Injections","Amateur Hour","Dirty Work","Too Much Baggage","Adventures in Babysitting","Fresh Evidence","Power Play","Child's Play","Headliners","Close Surveillance","Delivery Method","Team Building","Fully Catered","VCIA Takedown","Sunset"
  ]},
  {id:5,name:"Top of the World, Ma",missions:[
   "Bird in the Hand","Taking Liberties","VC Baby","Doggie Bag","Operation Savage Glory","Protective Custody"
  ]}
 ];
 const list=document.getElementById("missionList"),detail=document.getElementById("missionDetail"),search=document.getElementById("missionSearch"),filter=document.getElementById("chapterFilter");
 if(!list||!detail||!search||!filter)return;
 const all=chapters.flatMap(c=>c.missions.map((name,index)=>({name,chapter:c.id,chapterName:c.name,number:index+1,optional:["Thrillbillies","Twist Wrist, Smash, Grab","Kitty Litter Labs"].includes(name)})));
 function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
 function showMission(m){
  detail.innerHTML="<small>CHAPTER "+m.chapter+" / "+(m.optional?"OPTIONAL MISSION":"STORY MISSION")+"</small><h3>"+esc(m.name)+"</h3><p><b>"+esc(m.chapterName)+"</b><br>This mission is listed in the index. A full step-by-step walkthrough with objectives, map locations and rewards will be added after the details have been reliably cross-checked.</p><span class='guide-state'>WALKTHROUGH IN PREPARATION</span><br><a href='https://www.gamesradar.com/games/grand-theft-auto/gta-6-mission-list/' target='_blank' rel='noopener'>Mission list / source ↗</a>";
  list.querySelectorAll(".mission-item").forEach(b=>b.classList.toggle("active",b.dataset.name===m.name));
 }
 function render(){
  const q=search.value.trim().toLowerCase(),chapter=filter.value;
  const items=all.filter(m=>(chapter==="all"||String(m.chapter)===chapter)&&m.name.toLowerCase().includes(q));
  list.innerHTML="";
  if(!items.length){list.innerHTML="<div class='mission-empty'>No missions found. Check the spelling or chapter filter.</div>";return;}
  items.forEach(m=>{
   const b=document.createElement("button");b.type="button";b.className="mission-item";b.dataset.name=m.name;
   b.innerHTML="<span class='mission-no'>"+String(m.number).padStart(2,"0")+"</span><span><span class='mission-name'>"+esc(m.name)+(m.optional?" · Optional":"")+"</span><span class='mission-chapter'>CHAPTER "+m.chapter+" / "+esc(m.chapterName.toUpperCase())+"</span></span>";
   b.addEventListener("click",()=>showMission(m));list.append(b);
  });
 }
 search.addEventListener("input",render);filter.addEventListener("change",render);render();
})();