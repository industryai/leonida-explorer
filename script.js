/* Global navigation and footer */
document.querySelector("#menu")?.addEventListener("click",()=>document.querySelector("#nav")?.classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("#nav")?.classList.remove("open")));
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();

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
{name:"'55 Vapid Stanier",type:"car",label:"Sedan",maker:"Vapid",status:"Confirmed name · Rockstar render",source:"Rockstar official render",detail:"Two-tone 1950s hardtop sedan from the Vintage Vice City Pack. Top speed, handling, price and spawn location have not been measured in the cited record.",url:"https://gtaplaybook.com/gta6/vehicles/vapid-stanier/",image:"https://gtaplaybook.com/wp-content/uploads/2026/09/gtap-frame-render-vapid-stanier-01-4eb6bc07.jpg"},
{name:"'67 Vapid Dominator Buggy",type:"utility",label:"Off-road",maker:"Vapid",status:"Confirmed name · Rockstar render",source:"Rockstar official render",detail:"A lifted sixties coupe conversion with tractor tyres, roof lights and a tubular bull bar. Rockstar names it in Ultimate Edition material.",url:"https://gtaplaybook.com/gta6/vehicles/vapid-dominator-buggy/",image:"https://gtaplaybook.com/wp-content/uploads/2026/09/gtap-frame-render-vapid-dominator-buggy-04-77a746cd.jpg"},
{name:"'95 Grotti Cheetah",type:"car",label:"Supercar",maker:"Grotti",status:"Confirmed name · Trailer 1",source:"Trailer 1 · 00:32.57",detail:"A white wedge-shaped sports car seen on Ocean Drive. The name is supported by Rockstar's media renders and the matching vehicle details.",url:"https://gtaplaybook.com/gta6/vehicles/grotti-cheetah/"},
{name:"Airboat 09",type:"boat",label:"Airboat",maker:"Airgator",status:"Confirmed name · Extended Look",source:"Extended Look · 17:09.87",detail:"Airboat name readable in Rockstar footage. Real-world performance and in-game availability are not listed in the source record.",url:"https://gtaplaybook.com/gta6/vehicles/airgator-airboat-09/"},
{name:"'85 Emperor",type:"car",label:"Sedan",maker:"Albany",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Name shown on an in-game vehicle panel in a player capture. Performance and price are not established.",url:"https://gtaplaybook.com/gta6/vehicles/albany-85-emperor/"},
{name:"Schafter",type:"car",label:"Sedan",maker:"Benefactor",status:"Confirmed name · Extended Look",source:"Extended Look · 15:49.90",detail:"Benefactor name reported legible in Rockstar footage. Exact performance and spawn points remain unverified.",url:"https://gtaplaybook.com/gta6/vehicles/benefactor-schafter/"},
{name:"Bobcat",type:"utility",label:"Utility",maker:"Not legible",status:"Confirmed name · Footage label",source:"Extended Look · 06:04.90",detail:"The vehicle name is identified in the evidence archive; the manufacturer badge is not legible.",url:"https://gtaplaybook.com/gta6/vehicles/dark-pickup-with-a-bed-rack/"},
{name:"BTN Delmar",type:"boat",label:"Boat",maker:"Not confirmed",status:"Confirmed name · Trailer 1",source:"Trailer 1 · 00:23.27",detail:"Boat name reported as readable in Rockstar footage. Manufacturer not established.",url:"https://gtaplaybook.com/gta6/vehicles/btn-delmar/"},
{name:"Crest Kayak",type:"boat",label:"Kayak",maker:"Crest",status:"Confirmed name · Ultimate Edition",source:"Ultimate Edition material",detail:"Kayak included in Ultimate Edition material. The evidence archive documents multiple kayak variants.",url:"https://gtaplaybook.com/gta6/vehicles/crest-kayak/"},
{name:"Granger",type:"car",label:"SUV",maker:"Declasse",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Declasse SUV name shown on an in-game vehicle panel in a player capture.",url:"https://gtaplaybook.com/gta6/vehicles/declasse-granger/"},
{name:"Deviant",type:"car",label:"Sports classic",maker:"Not confirmed",status:"Confirmed name · Rockstar render",source:"Rockstar official render",detail:"Named sports-classic entry in Rockstar's published material. Manufacturer is not established in the source record.",url:"https://gtaplaybook.com/gta6/vehicles/deviant/"},
{name:"Como",type:"boat",label:"Boat",maker:"Dingus",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Dingus Como name shown on an in-game vehicle panel in a player capture.",url:"https://gtaplaybook.com/gta6/vehicles/dingus-como/"},
{name:"'85 Blista",type:"car",label:"Sedan",maker:"Dinka",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Dinka Blista name shown on an in-game vehicle panel in a player capture.",url:"https://gtaplaybook.com/gta6/vehicles/dinka-85-blista/"},
{name:"Dinka Enduro",type:"bike",label:"Motorcycle",maker:"Dinka",status:"Confirmed name · Rockstar press pack",source:"Rockstar press pack",detail:"Motorcycle named in the Rockstar press pack. Real-world donor guesses are not treated as official facts.",url:"https://gtaplaybook.com/gta6/vehicles/dinka-enduro/"},
{name:"Coquette D10",type:"car",label:"Sports car",maker:"Invetero",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Invetero Coquette D10 name shown on an in-game vehicle panel in a player capture.",url:"https://gtaplaybook.com/gta6/vehicles/invetero-coquette-d10/"},
{name:"L35P",type:"boat",label:"Boat",maker:"Lürepredator",status:"Confirmed name · Extended Look",source:"Extended Look · 25:50.73",detail:"Watercraft name reported as readable in Rockstar footage.",url:"https://gtaplaybook.com/gta6/vehicles/lurepredator-l35p/"},
{name:"Jugular",type:"car",label:"Sedan",maker:"Ocelot",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Ocelot Jugular name shown on an in-game vehicle panel in a player capture.",url:"https://gtaplaybook.com/gta6/vehicles/ocelot-jugular/"},
{name:"Alvino V1",type:"bike",label:"Motorcycle",maker:"Principe",status:"Confirmed name · Rockstar footage",source:"Rockstar press pack / Extended Look",detail:"Principe motorcycle name identified in Rockstar material.",url:"https://gtaplaybook.com/gta6/vehicles/principe-alvino-v1/"},
{name:"Rancher",type:"utility",label:"Utility",maker:"Not confirmed",status:"Confirmed name · Trailer 2",source:"Trailer 2 · 00:34.60",detail:"Vehicle name reported as readable in Rockstar footage; manufacturer badge not established.",url:"https://gtaplaybook.com/gta6/vehicles/rancher/"},
{name:"Riata",type:"utility",label:"Off-road",maker:"Not confirmed",status:"Confirmed name · Rockstar render",source:"Rockstar official render",detail:"Off-road model named in Rockstar material. Manufacturer is not stated in the evidence record.",url:"https://gtaplaybook.com/gta6/vehicles/riata/"},
{name:"Seashark",type:"boat",label:"Personal watercraft",maker:"Not confirmed",status:"Confirmed name · Rockstar footage",source:"Rockstar footage",detail:"Personal watercraft name identified in the evidence archive.",url:"https://gtaplaybook.com/gta6/vehicles/seashark/"},
{name:"Shitzu Squalo",type:"boat",label:"Speedboat",maker:"Shitzu",status:"Confirmed name · Ultimate Edition",source:"Rockstar official render",detail:"Shitzu Squalo is named in Ultimate Edition material.",url:"https://gtaplaybook.com/gta6/vehicles/shitzu-squalo/"},
{name:"Sirius",type:"car",label:"Sports classic",maker:"Not confirmed",status:"Confirmed name · Rockstar render",source:"Rockstar official render",detail:"Named sports-classic entry in Rockstar material. Manufacturer is not established.",url:"https://gtaplaybook.com/gta6/vehicles/sirius/"},
{name:"Ganado",type:"car",label:"Sports classic",maker:"Vapid",status:"Confirmed name · Rockstar render",source:"Rockstar official render",detail:"Vapid Ganado is named in Rockstar material; the record classifies it as a sports classic.",url:"https://gtaplaybook.com/gta6/vehicles/vapid-ganado/"},
{name:"Sandking XT",type:"utility",label:"Pickup",maker:"Vapid",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Vapid Sandking XT name shown on an in-game vehicle panel in a player capture.",url:"https://gtaplaybook.com/gta6/vehicles/vapid-sandking-xt/"},
{name:"Stanier G2",type:"car",label:"Sedan",maker:"Vapid",status:"Confirmed name · Player capture",source:"In-game vehicle panel capture",detail:"Vapid Stanier G2 name shown on an in-game vehicle panel in a player capture.",url:"https://gtaplaybook.com/gta6/vehicles/vapid-stanier-g2/"}
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
   const items=config.items.filter(x=>(kind==="all"||x.type===kind)&&(x.name+" "+x.label+" "+x.detail+" "+x.maker+" "+x.status).toLowerCase().includes(q));
   if(!items.length){grid.innerHTML='<div class="db-empty">No matching entries. Try another search term or filter.</div>';return;}
   grid.innerHTML=items.map((x,i)=>'<article class="db-card vehicle-card">'+(x.image?'<a class="vehicle-thumb" href="'+x.url+'" target="_blank" rel="noopener"><img src="'+x.image+'" alt="'+escapeText(x.name)+' screenshot" loading="lazy"></a>':'<div class="vehicle-no-image"><span>VICECITYWIRE</span><b>'+escapeText(x.label.toUpperCase())+'</b><small>IMAGE NOT YET VERIFIED</small></div>')+'<div class="db-card-top"><span class="db-type">'+escapeText(x.label)+'</span><span class="db-status">'+escapeText(x.status.toUpperCase())+'</span></div><h3>'+escapeText(x.name)+'</h3><p class="db-maker">MANUFACTURER · '+escapeText(x.maker)+'</p><button type="button" class="vehicle-detail-btn" data-vehicle="'+config.items.indexOf(x)+'">VIEW VEHICLE FILE +</button><div class="db-meta">SOURCE: '+escapeText(x.source.toUpperCase())+'<br><a href="'+x.url+'" target="_blank" rel="noopener">OPEN SOURCE RECORD ↗</a></div></article>').join("");
  }
  grid.addEventListener("click",e=>{const b=e.target.closest("[data-vehicle]");if(!b)return;const x=config.items[Number(b.dataset.vehicle)];const panel=document.getElementById("vehicleDetailPanel");if(!panel)return;panel.hidden=false;panel.innerHTML='<button type="button" class="vehicle-detail-close" aria-label="Close details">×</button><small>VEHICLE FILE / '+escapeText(x.status.toUpperCase())+'</small><h3>'+escapeText(x.name)+'</h3><p class="db-maker">MANUFACTURER · '+escapeText(x.maker)+'</p><p><b>CLASS</b> · '+escapeText(x.label)+'</p><p><b>EVIDENCE</b> · '+escapeText(x.source)+'</p><p>'+escapeText(x.detail)+'</p><a class="btn hot" href="'+x.url+'" target="_blank" rel="noopener">FULL EVIDENCE RECORD ↗</a>';panel.scrollIntoView({behavior:"smooth",block:"nearest"});});document.getElementById("vehicleDetailPanel")?.addEventListener("click",e=>{if(e.target.closest(".vehicle-detail-close")){const p=document.getElementById("vehicleDetailPanel");p.hidden=true;p.innerHTML="";}});search.addEventListener("input",render);select.addEventListener("change",render);render();
 }
 mount({grid:"vehicleGrid",search:"vehicleSearch",select:"vehicleType",items:vehicles});

})();
/* Searchable index of names printed on Rockstar's Leonida poster map. */
(function initLocationDirectory(){
 const entries=[
  ["Abismo Key","place"],  ["Frogswater","place"],["Gloriana Key","place"],["Goose Key","place"],["Grayson","place"],["Hyde Island","place"],["Kelly County","place"],["La Perle","place"],["Leaf Links","place"],["Little Hardin Island","place"],["Lummox County","place"],["Manifest Canyon","place"],["Mariana County","place"],["Maroon Key","place"],["Millport","place"],["Moreau","place"],["North Kelly County","place"],["North Leonard County","place"],["Ocean Beach","place"],["Oldby Island","place"],["Peacock Bay","place"],["Pelican Valley","place"],["Penmarch Isle","place"],["Permit Keys","place"],["Rialto Islands","place"],["Richard Barebone State Park","place"],["Riquezas Keys","place"],["Rockridge","place"],["Saint Attaway Islands","place"],["Salton","place"],["Sandbars","place"],["Ambrosia","place"],["Balsero","place"],["Bayside","place"],["Belpoint","place"],["Belville","place"],["Big Pine","place"],["Bluegrass","place"],["Bobcat Key","place"],["Bonanza","place"],["Breakwater Quarry","place"],["Buckskin Swamp","place"],["Capri","place"],["Casanova Island","place"],["Catalan Island","place"],["Catalan Key","place"],["Corsair Key","place"],["Crosstown","place"],["Crude Islands","place"],["Dalton Island","place"],["Decor District","place"],["Downtown","place"],["Draper Island","place"],["East Lummox County","place"],["Emerald Springs","place"],["Featherstone Islands","place"],["Frampton Islands","place"],["Gellhorn","place"],["Grassrivers","place"],["Hamlet","place"],["Key Lento","place"],["Leonida Keys","place"],["Little Cuba","place"],["Mount Kalaga National Park","place"],["Port Gellhorn","place"],["Shoeless Keys","place"],["South Kelly County","place"],["South Leonard County","place"],["South Vice-Dale","place"],["South West Lummox County","place"],["Southside Vice City","place"],["Southwind","place"],["Starfish Island","place"],["Stockyard","place"],["Tequesta","place"],["Tequesta Retreat","place"],["Vespucci Island","place"],["Vice Beach","place"],["Vice City","place"],["Vice-Dale County","place"],["Vinewood Beach","place"],["Waning Sands","place"],["Washington Beach","place"],["Washington Island","place"],["Watson Bay","place"],["Waxman Island","place"],["West Vice-Dale County","place"],["Wild Hog Point","place"],["Zephyr Islands","place"],
  ["Allied Crystal sugar refinery","landmark"],["Ambrosia Raceway Park","landmark"],["Ambrosia Rodeo Association","landmark"],["Boone Speedway","landmark"],["Cellerica","landmark"],["Chateau Cellerica","landmark"],["Courtland Park","landmark"],["Evergreen Mall of Waning Sands","landmark"],["Father Scrumpy's Red Apple Orchard","landmark"],["FLAM","landmark"],["Fleeca Field","landmark"],["Gellhorn Raceway","landmark"],["Hamlet Correctional Institution","landmark"],["Henry J Edwards Airport","landmark"],["Howe Dairy","landmark"],["Leonida State Prison","landmark"],["MacAlister Gold Mine","landmark"],["Mile Zero Air Station","landmark"],["Mount Hailes Country Club","landmark"],["Paradise RV Park","landmark"],["Peacock Estates","landmark"],["Sabal Palms","landmark"],["Sahara Arena","landmark"],["Sahara Network Data Center","landmark"],["Salton Memorial Island","landmark"],["T.H. Power Station","landmark"],["Tallaloko Lakeside Resort","landmark"],["Thrillbilly Mud Club","landmark"],["Tisha-Wocka flea market","landmark"],["Tucker's Citrus Farms","landmark"],["VC Port","landmark"],["VCI Airport","landmark"],["Vice City Oceanarium","landmark"],["Wild Hog Airfield","landmark"],
  ["County Route 62","road"],["Interstate 97","road"],["Interstate 297","road"],["Interstate 397","road"],["Interstate 404","road"],["State Route 1A","road"],["U.S. 35","road"],["U.S. 82","road"],["U.S. 183","road"],["U.S. 628","road"],
  ["Bobcat Bight","water"],["Borrachero Sound","water"],["Burial Creek","water"],["Capri Sound","water"],["Catalan Bay","water"],["Cottonmouth Lake","water"],["Draper Bay","water"],["Emerald River","water"],["Gambit Bay","water"],["Gulf of Leonida","water"],["Gullet Marsh","water"],["Lake Leonida","water"],["Lake Tallaloko","water"],["Leonida Bay","water"],["Leonida Straits","water"],["Millport Basin","water"],["Moreau River","water"],["Nehrling River","water"],["Okchiloha Bay","water"],["Partridge Bay","water"],["Pelican River","water"],["Peregrine Bay","water"],["San Malo Bay","water"],["Three Toe Lake","water"],["Tola Bay","water"],["Tortoise Lake","water"],["Wetman Bay","water"]
 ];
 const grid=document.getElementById("locationGrid"),search=document.getElementById("locationSearch"),filter=document.getElementById("locationType");
 const progressCount=document.getElementById("locationProgressCount"),progressFill=document.getElementById("locationProgressFill"),reset=document.getElementById("locationProgressReset");
 if(!grid||!search||!filter||!progressCount||!progressFill||!reset)return;
 const labels={place:"PLACE / REGION",landmark:"LANDMARK",road:"ROAD",water:"WATER"};
 const storageKey="vicecitywire-found-locations-v1";
 let saved={};
 try{saved=JSON.parse(localStorage.getItem(storageKey)||"{}")||{};}catch(e){saved={};}
 const keyFor=name=>"loc-"+name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
 function updateProgress(save=true){
  const done=entries.filter(([name])=>Boolean(saved[keyFor(name)])).length;
  progressCount.textContent=done+" / "+entries.length+" locations found";
  progressFill.style.width=(done/entries.length*100)+"%";
  if(save){try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch(e){}}
 }
 function render(){
  const q=search.value.trim().toLowerCase(),kind=filter.value;
  const matches=entries.filter(([name,type])=>(kind==="all"||kind===type)&&name.toLowerCase().includes(q));
  grid.innerHTML=matches.length?matches.map(([name,type])=>{
   const key=keyFor(name),done=Boolean(saved[key]);
   return '<article class="location-card'+(done?' is-found':'')+'"><small>'+labels[type]+'</small><b>'+name+'</b><span>PRINTED MAP LABEL</span><button type="button" class="location-found" data-location="'+key+'" aria-pressed="'+done+'">'+(done?'✓ FOUND':'＋ MARK AS FOUND')+'</button></article>';
  }).join(""):'<div class="db-empty">No matching map labels. Try another search or category.</div>';
 }
 grid.addEventListener("click",e=>{
  const button=e.target.closest("[data-location]");
  if(!button)return;
  const key=button.dataset.location;
  saved[key]=!saved[key];
  updateProgress();render();
 });
 search.addEventListener("input",render);filter.addEventListener("change",render);
 reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(storageKey);}catch(e){}updateProgress(false);render();});
 updateProgress(false);render();
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
/* Interactive poster map: wheel/pinch zoom, pointer drag and reset */
(function initLeonidaMap(){
 const viewport=document.getElementById("mapViewport"),img=document.getElementById("leonidaMap");
 const label=document.getElementById("mapZoomLabel"),plus=document.getElementById("mapZoomIn"),minus=document.getElementById("mapZoomOut"),reset=document.getElementById("mapReset");
 if(!viewport||!img||!label||!plus||!minus||!reset)return;
 let scale=1,x=0,y=0,drag=null;
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 function render(){img.style.transform="translate(calc(-50% + "+x+"px),calc(-50% + "+y+"px)) scale("+scale+")";label.textContent=Math.round(scale*100)+"%";}
 function zoom(next,cx=viewport.clientWidth/2,cy=viewport.clientHeight/2){
  const old=scale;next=clamp(next,1,5);if(next===old)return;
  const px=cx-viewport.clientWidth/2-x,py=cy-viewport.clientHeight/2-y;
  x-=px*(next/old-1);y-=py*(next/old-1);scale=next;render();
 }
 plus.addEventListener("click",()=>zoom(scale*1.25));minus.addEventListener("click",()=>zoom(scale/1.25));
 reset.addEventListener("click",()=>{scale=1;x=0;y=0;render();});
 viewport.addEventListener("wheel",e=>{e.preventDefault();zoom(scale*(e.deltaY<0?1.12:1/1.12),e.offsetX,e.offsetY);},{passive:false});
 viewport.addEventListener("pointerdown",e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,ox:x,oy:y};viewport.setPointerCapture(e.pointerId);});
 viewport.addEventListener("pointermove",e=>{if(!drag||drag.id!==e.pointerId)return;x=drag.ox+e.clientX-drag.x;y=drag.oy+e.clientY-drag.y;render();});
 const stop=e=>{if(drag&&drag.id===e.pointerId)drag=null;};
 viewport.addEventListener("pointerup",stop);viewport.addEventListener("pointercancel",stop);viewport.addEventListener("lostpointercapture",()=>drag=null);
 viewport.addEventListener("dblclick",e=>{const r=viewport.getBoundingClientRect();zoom(scale*1.5,e.clientX-r.left,e.clientY-r.top);});
 img.addEventListener("load",render);render();
})();

/* Secrets and Easter eggs: personal log with evidence labels. */
(function initSecrets(){
 const items=[
  {name:"The Literal Easter Egg",type:"Easter egg",where:"Top of Vice City's tallest radio tower",detail:"Climb to the nest at the top of the tower, take a painted egg and throw it from the ledge to trigger a short scene.",status:"confirmed",source:"GTA6Wiki / GamerPapers",url:"https://gta6wiki.eu/easter-eggs/"},
  {name:"The Skunk Ape",type:"Rare encounter",where:"Swamps south of Hamlet / Cottonmouth Lake area",detail:"A Bigfoot-like creature appears near a deer carcass. Follow it into the woods and inspect the branch effigy. The precise reported encounter area differs between guides.",status:"confirmed",source:"Leonidaguide / GTA Scoop",url:"https://leonidaguide.gg/en/guides/easter-eggs/gta-6-easter-egg/"},
  {name:"Cool Dog & Dog Island",type:"Rare encounter",where:"Open water offshore",detail:"When stranded far offshore, a dog wearing goggles may arrive on a jet ski and take the player to an island inhabited by dogs.",status:"confirmed",source:"GamerPapers / GTA6Wiki",url:"https://en.gamerpapers.com/gta-6-hidden-details-players-found/"},
  {name:"Dexter's Apartment",type:"Pop-culture reference",where:"Trinity Apartments, Washington Island, Vice City",detail:"A waterfront building modelled on Dexter Morgan's apartment from the television series. Guides describe an exterior reference; do not assume the apartment interior is accessible.",status:"confirmed",source:"GTA Scoop / GTA6Wiki",url:"https://gtascoop.com/guides/gta-6-easter-eggs-and-secrets/"},
  {name:"The UFO — The Truth Is Out There",type:"Hidden encounter / trophy",where:"Road near Starlet Motel, Kelly County",detail:"Guides report a night-time encounter around 2 AM. Follow the flashing car and light trail. Trigger requirements differ between walkthroughs, so treat the exact conditions as guide-dependent.",status:"confirmed",source:"Leonidaguide / GTA Scoop",url:"https://leonidaguide.gg/en/guides/easter-eggs/gta-6-easter-egg/"},
  {name:"The Belville House",type:"Series reference",where:"Belville, Leonard County",detail:"A house matching a mysterious image shown in GTA: San Andreas — The Definitive Edition has been identified in Leonida. The reference is documented; the full context remains a fan interpretation.",status:"confirmed",source:"GTA6Wiki",url:"https://gta6wiki.eu/easter-eggs/"},
  {name:"A Cowboy from New Austin",type:"Red Dead Redemption reference",where:"Jacob's Tavern, Millport",detail:"Look for a Western novel about a cowboy from New Austin, a reference to the Red Dead Redemption setting.",status:"reported",source:"GTA Scoop",url:"https://gtascoop.com/guides/gta-6-easter-eggs-and-secrets/"},
  {name:"Liberty City at Jason's House",type:"GTA series reference",where:"Jason's house, Key Lento",detail:"A reference to Liberty City is reported on the dining-room table during the early chapter when the house can be explored.",status:"reported",source:"GTA Scoop",url:"https://gtascoop.com/guides/gta-6-easter-eggs-and-secrets/"},
  {name:"The Smoking Meteorite",type:"Hidden collectible",where:"Hillside Campsite, Mount Kalaga National Park",detail:"A shallow crater emitting purple smoke contains a meteorite pickup. Reported route: southwest of Dawson Dam near the campsite tents.",status:"reported",source:"Enzo's Domain",url:"https://www.enzoalder.com/gta-vi/easter-eggs"},
  {name:"Giant Crab Ambush",type:"Easter egg / encounter",where:"Crab research site, Gullet Marsh area",detail:"Players have reported a giant-crab encounter at a research location. Exact approach and trigger details are still being cross-checked.",status:"reported",source:"GTAside",url:"https://gtaside.com/tips/gta6/easter-eggs/"},
  {name:"Kraken Sighting",type:"Unverified lead",where:"Open water",detail:"A large sea-creature sighting has circulated in early player footage, but the available reports are not strong enough to treat it as confirmed.",status:"reported",source:"Community lead — unverified",url:"https://gta6wiki.eu/easter-eggs/"}
 ];
 const grid=document.getElementById("secretGrid"),search=document.getElementById("secretSearch"),filter=document.getElementById("secretStatus"),count=document.getElementById("secretFoundCount"),fill=document.getElementById("secretFoundFill"),reset=document.getElementById("secretReset");
 if(!grid||!search||!filter||!count||!fill||!reset)return;
 const key="vicecitywire-secret-log-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase(),status=filter.value;
  const found=items.map((x,i)=>({...x,i,logged:!!saved[i]})).filter(x=>(status==="all"||x.status===status)&&(x.name+" "+x.type+" "+x.where+" "+x.detail).toLowerCase().includes(q));
  grid.innerHTML=found.length?found.map(x=>'<article class="secret-card"><div class="secret-card-top"><span>'+esc(x.type)+'</span><em class="'+(x.status==="confirmed"?"verified":"reported")+'">'+(x.status==="confirmed"?"CROSS-CHECKED":"REPORTED / CHECK")+'</em></div><h3>'+esc(x.name)+'</h3><p class="secret-where">LOCATION · '+esc(x.where)+'</p><p>'+esc(x.detail)+'</p><a href="'+x.url+'" target="_blank" rel="noopener">SOURCE: '+esc(x.source.toUpperCase())+' ↗</a><label class="secret-check"><input type="checkbox" data-secret="'+x.i+'" '+(x.logged?"checked":"")+'><span>MARK AS DISCOVERED</span></label></article>').join(""):'<div class="db-empty">No matching discoveries. Try another search or status.</div>';
  const n=items.filter((x,i)=>saved[i]).length;count.textContent=n+" / "+items.length+" logged";fill.style.width=(n/items.length*100)+"%";
 }
 grid.addEventListener("change",e=>{if(e.target.matches("[data-secret]")){saved[e.target.dataset.secret]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}render();}});
 search.addEventListener("input",render);filter.addEventListener("change",render);reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(e){}render();});render();
})();
/* Weapon catalogue transcribed from public recordings of the released game. */
(function initWeaponDatabase(){
 const items=[
 ["Duke 1922","pistol"],["Duval Signature ES9","pistol"],["Fairview Kalinga .50","pistol"],["Girardi ES9","pistol","Ultimate Edition · Jason"],["Girardi ES18","pistol"],["Klose K17","pistol","Ultimate Edition · Lucia"],["Klose K17 MCD","pistol"],["Mahi Nipper .38","pistol"],["Schlamm DRX","pistol"],["Scorpio Nipper .38","pistol"],
 ["Duke Mustang .357","revolver"],["Hawk & Little .38","revolver"],["Hawk & Little Morgan revolver","revolver","Ultimate Edition · Jason and Lucia"],["Scorpio Akulus","revolver"],["Wortham WCR1","revolver"],
 ["ADB PD-90","smg"],["BZI Vatra","smg"],["Deever Tech DSG","smg"],["Schlamm DW-9","smg"],["Vom Feuer VF5","smg"],["Vom Feuer VF5C","smg"],["Wortham W-10","smg"],["Zhang Wu Type 9","smg"],
 ["Fortune & Son Gorse 425","shotgun"],["Fortune & Son Moreland 850","shotgun"],["Girardi AZ1200","shotgun"],["Girardi Super400","shotgun"],["Girardi Verro","shotgun"],["Goodwin Comshot 12","shotgun"],["Kozlov KVGA-12","shotgun"],["Mason & Keen Longshot","shotgun"],["Mason & Keen Shortstraw","shotgun"],["Shrewsbury Drifter","shotgun"],["Shrewsbury Hobo","shotgun"],
 ["ADB FRA","assault"],["Duke 556","assault"],["Hillinger Heathen","assault"],["Kozlov Hind","assault"],["Kozlov KZ-59","assault"],["Vom Feuer VF-G1","assault"],
 ["Hawk & Little Mediator","tactical"],["Hillinger M306","tactical"],["Hillinger M306 TMR","tactical"],["Wortham W-14","tactical"],
 ["Fairview FF-50","sniper"],["Fairview FF-SR","sniper"],["Fortune & Son Laird 350","sniper"],["Shrewsbury SM-69","sniper"],["Shrewsbury SMS-01","sniper"],
 ["ADB M350","machine"],["Hillinger Boomer","launcher"],
 ["Baton","melee"],["Brass Knuckles","melee"],["Bushcraft Knife","melee"],["Combat Knife","melee"],["Diving Knife","melee"],["EDC Knife","melee"],["Hunting Knife","melee"],["Survival Knife","melee"],["Switchblade","melee"],
 ["Flash Grenade","explosive"],["Frag Grenade","explosive"],["Sticky Bomb","explosive"],["Arras Bullhead","longarm"]
 ].map(([name,type,edition])=>({name,type,edition:edition||"",status:edition?"ROCKSTAR EDITION NAME + IN-GAME":"VERIFIED IN GAME",price:({
 "Fortune & Son Laird 350":"$950","Shrewsbury SM-69":"$1,850","Shrewsbury SMS-01":"$2,150","Hillinger Boomer":"$12,000","Frag Grenade":"$140","Sticky Bomb":"$185"
 })[name]||"",store:(["Hillinger Boomer","Fortune & Son Laird 350","Shrewsbury SM-69","Shrewsbury SMS-01"].includes(name)?"Expanded Ammu-Nation":name==="Frag Grenade"||name==="Sticky Bomb"?"Ammu-Nation":"Ammu-Nation / availability varies"),note:"Name read from the released game in a public recording. Damage, range and handling have not been independently measured in this catalogue.",url:"https://gta6db.io/weapons"}));
 const labels={pistol:"Pistol",revolver:"Revolver",smg:"Submachine gun",shotgun:"Shotgun",assault:"Assault rifle",tactical:"Tactical rifle",sniper:"Sniper rifle",machine:"Machine gun",launcher:"Launcher",melee:"Melee weapon",explosive:"Explosive",longarm:"Longarm"};
 const grid=document.getElementById("weaponGrid"),search=document.getElementById("weaponSearch"),filter=document.getElementById("weaponType"),panel=document.getElementById("weaponDetailPanel");
 if(!grid||!search||!filter||!panel)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase(),type=filter.value;
  const found=items.filter(x=>(type==="all"||x.type===type)&&(x.name+" "+labels[x.type]+" "+x.edition+" "+x.status).toLowerCase().includes(q));
  grid.innerHTML=found.length?found.map(x=>'<article class="db-card weapon-card"><div class="weapon-silhouette"><span>'+esc(labels[x.type].toUpperCase())+'</span><b>'+esc(x.name.split(" ").slice(0,2).join(" ").toUpperCase())+'</b></div><div class="db-card-top"><span class="db-type">'+esc(labels[x.type])+'</span><span class="db-status">'+(x.edition?"ROCKSTAR NAMED":"IN-GAME VERIFIED")+'</span></div><h3>'+esc(x.name)+'</h3><p class="weapon-price">'+(x.price?"SHOP PRICE · "+esc(x.price):"PRICE · NOT VERIFIED")+'</p><button type="button" class="weapon-open" data-weapon="'+items.indexOf(x)+'">VIEW WEAPON FILE +</button></article>').join(""):'<div class="db-empty">No matching weapons. Try another name or category.</div>';
 }
 grid.addEventListener("click",e=>{
  const b=e.target.closest("[data-weapon]");if(!b)return;
  const x=items[Number(b.dataset.weapon)];
  panel.hidden=false;
  panel.innerHTML='<button type="button" class="vehicle-detail-close" aria-label="Close details">×</button><small>WEAPON FILE / '+esc(x.status)+'</small><h3>'+esc(x.name)+'</h3><p><b>CLASS</b> · '+esc(labels[x.type])+'</p><p><b>EDITION</b> · '+esc(x.edition||"No Rockstar edition naming found")+'</p><p><b>SHOP PRICE</b> · '+esc(x.price||"Not verified in the available recording")+'</p><p><b>AVAILABILITY</b> · '+esc(x.store)+'</p><p>'+esc(x.note)+'</p><a class="btn hot" href="'+x.url+'" target="_blank" rel="noopener">OPEN EVIDENCE DATABASE ↗</a>';
  panel.scrollIntoView({behavior:"smooth",block:"nearest"});
 });
 panel.addEventListener("click",e=>{if(e.target.closest(".vehicle-detail-close")){panel.hidden=true;panel.innerHTML="";}});
 search.addEventListener("input",render);filter.addEventListener("change",render);render();
})();
/* Ammu-Nation directory: 24 named locations mapped by PowerPyx. */
(function initAmmuNationDirectory(){
 const stores=[
 ["Barrage Gun Supply","Mariana County","Watson Bay","Standard","Clothing, weapon locker and fishing supplies are reported."],
 ["Chuck’s Tackle & Shot","Mariana County","Key Lento","Limited","Limited inventory; clothing, weapon locker and fishing supplies are reported."],
 ["Guns Aplenty!","Mariana County","Watson Bay","Hunting","Hunting-focused inventory; ATM and weapon locker are reported."],
 ["Richardson Hunting Supplies","Mariana County","North Mariana County","Standard","Standard inventory; clothing and weapon locker are reported."],
 ["Woodhatch","Mariana County","Capri","Expanded","Expanded inventory; clothing, weapon locker and fishing supplies are reported."],
 ["Big Shots","Vice-Dale County","Hamlet","Expanded","Expanded inventory; clothing and weapon locker are reported."],
 ["Hamlet Traders","Vice-Dale County","Hamlet","Standard","Standard inventory."],
 ["Phil’s Ammu-Nation","Vice-Dale County","South Vice City","Expanded","Expanded inventory; clothing, weapon locker and fishing supplies are reported."],
 ["Tequesta Guns & Ammo","Vice-Dale County","Central Vice City","Standard","Standard inventory; weapon locker is reported."],
 ["Vice City Firearms","Vice-Dale County","South-central Vice City","Standard","Standard inventory; clothing and weapon locker are reported."],
 ["Martez Empenos","Vice-Dale County","Central Vice City","Standard","Standard inventory."],
 ["Jackson Firearms","Vice-Dale County","Central Vice City","Standard","Standard inventory; clothing and weapon locker are reported."],
 ["Vice City Gun & Pawn","Vice-Dale County","Central Vice City","Standard","Standard inventory."],
 ["Pawn & Gun – Crosstown","Vice-Dale County","Central Vice City","Standard","Standard inventory."],
 ["Quickscope","Vice-Dale County","Central Vice City","Standard","Standard inventory; clothing and weapon locker are reported."],
 ["Black Eagle","Vice-Dale County","Northwest Vice City","Expanded","Expanded inventory; clothing and weapon locker are reported."],
 ["Zenon’s Pawn Shop","Vice-Dale County","North Vice City","Standard","Standard inventory; clothing is reported."],
 ["Iron & Oak","Vice-Dale County","North Vice City","Expanded","Expanded inventory; clothing and weapon locker are reported."],
 ["Prestige Firearms","Vice-Dale County","Vice Beach","Expanded","Expanded inventory; clothing, weapon locker and fishing supplies are reported."],
 ["Tactical Outlet Guns","Leonard County","Belville","Standard","Standard inventory; clothing is reported."],
 ["Pawn & Gun – Port Gellhorn","Kelly County","Port Gellhorn","Standard","Standard inventory."],
 ["Gellhorn Outfitters","Kelly County","Port Gellhorn","Standard","Standard inventory; clothing, weapon locker and fishing supplies are reported."],
 ["Biff’s Gun Supply","Kelly County","Ambrosia","Standard","Standard inventory; clothing, weapon locker and fishing supplies are reported."],
 ["Rusty Willis Jr. Hunting Supplies","Lummox County","Mount Kalaga National Park","Hunting","Hunting-focused inventory; clothing, weapon locker and fishing supplies are reported."]
 ];
 const grid=document.getElementById("ammuGrid"),search=document.getElementById("ammuSearch"),county=document.getElementById("ammuCounty"),level=document.getElementById("ammuLevel"),panel=document.getElementById("ammuDetailPanel");
 if(!grid||!search||!county||!level||!panel)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase();
  const found=stores.filter(x=>(county.value==="all"||x[1]===county.value)&&(level.value==="all"||x[3]===level.value)&&x.join(" ").toLowerCase().includes(q));
  grid.innerHTML=found.length?found.map(x=>'<article class="db-card ammu-card"><div class="db-card-top"><span class="db-type">'+esc(x[1])+'</span><span class="db-status">'+esc(x[3].toUpperCase())+'</span></div><h3>'+esc(x[0])+'</h3><p class="db-maker">'+esc(x[2])+'</p><p>'+esc(x[4])+'</p><button class="ammu-open" type="button" data-store="'+stores.indexOf(x)+'">STORE FILE +</button></article>').join(""):'<div class="db-empty">No matching stores. Adjust your search or filters.</div>';
 }
 grid.addEventListener("click",e=>{
  const b=e.target.closest("[data-store]");if(!b)return;
  const x=stores[Number(b.dataset.store)];
  panel.hidden=false;
  panel.innerHTML='<button type="button" class="vehicle-detail-close" aria-label="Close details">×</button><small>AMMU-NATION LOCATION / '+esc(x[1])+'</small><h3>'+esc(x[0])+'</h3><p><b>AREA</b> · '+esc(x[2])+'</p><p><b>STOCK LEVEL</b> · '+esc(x[3])+'</p><p>'+esc(x[4])+'</p><p><b>TRAVEL TIP</b> · Use the in-game map filter for Ammu-Nations; the orange gun icon reveals each store’s selection and available features.</p><a class="btn hot" href="https://www.powerpyx.com/gta-6-all-ammu-nation-gun-stores-locations/" target="_blank" rel="noopener">OPEN LOCATION REFERENCE ↗</a>';
  panel.scrollIntoView({behavior:"smooth",block:"nearest"});
 });
 panel.addEventListener("click",e=>{if(e.target.closest(".vehicle-detail-close")){panel.hidden=true;panel.innerHTML="";}});
 search.addEventListener("input",render);county.addEventListener("change",render);level.addEventListener("change",render);render();
})();

/* 100% completion checklist based on the published in-game requirements guide. */
(function initFullCompletionChecklist(){
 const root=document.getElementById("completionGroups"),fill=document.getElementById("completionFill"),pct=document.getElementById("completionPercent"),reset=document.getElementById("completionReset");
 if(!root||!fill||!pct||!reset)return;
 const groups=[
  {id:"story",title:"STORY & TASKS",weight:45,items:[
   ["Story Completion","Complete the main story through the end credits."],
   ["100 Optional Tasks","Complete at least 100 optional tasks."],
   ["Gang Operations","Clear all 39 of 39 gang operations."],
   ["Bank Jobs","Fully complete all 22 bank jobs."],
   ["Payday Loan Jobs","Fully complete all 7 payday loan jobs."],
   ["Smash ’N’ Grabs","Fully complete at least 34 of 35 smash-and-grab jobs."],
   ["Stick Ups","Complete at least 50 of 91 stick ups."],
   ["Narcotics Fenced","Fence $100,000 worth of narcotics."],
   ["Jewelry Fenced","Fence $100,000 worth of jewelry."],
   ["Marked Bills Fenced","Fence $250,000 worth of marked bills."],
   ["Vaults","Hit all 8 of 8 vaults."],
   ["Vehicles Fenced","Fence $200,000 worth of vehicles."]
  ]},
  {id:"explore",title:"EXPLORATION & ACTIVITIES",weight:45,items:[
   ["Kenton Sets","Complete at least 5 of 7 Kenton treasure sets."],
   ["Collectible Card Sets","Find at least 15 of 18 complete card sets."],
   ["WAiNK Locations","Scan 100 WAiNK locations."],
   ["Underwater Discoveries","Find all 33 underwater discoveries."],
   ["Magazines, Books & Comics","Find at least 30 of 34 unique items."],
   ["Meditation Spots","Complete at least 15 of 18 meditation spots."],
   ["Cocaine Flamingos","Destroy at least 100 of 125 flamingos."],
   ["Unique Playlists","Complete both 2 of 2 unique playlists."],
   ["Discovered Styles","Discover at least 70 of 79 styles."],
   ["Unique Races","Win at least 30 of 40 unique races."],
   ["Race Challenge Gold Medals","Earn at least 10 of 13 gold medals."],
   ["Shooting Range Gold Medals","Earn all 42 of 42 gold medals."],
   ["Video Games","Play all 4 of 4 video games."],
   ["Pool Opponents","Defeat at least 5 of 7 pool opponents."],
   ["Mini Golf","Play at 2 of 3 mini golf locations."],
   ["Basketball Hoops","Score at 90 of 100 different basketball hoops."],
   ["Drone Time Trials","Complete all 42 of 42 drone time trials."],
   ["Stunts","Complete at least 300 of 397 stunts."],
   ["Challenges","Complete at least 70 of 80 challenges."],
   ["Bret’s Target Decks","Complete all 15 of 15 target decks."]
  ]},
  {id:"discovery",title:"DISCOVERY",weight:10,items:[
   ["Base Model Vehicles","Scan at least 200 of 277 base model vehicles."],
   ["Standard Issue Weapons","Find at least 50 of 66 standard issue weapons."],
   ["Animals Studied","Study at least 100 of 255 animals."]
  ]}
 ];
 const key="vicecitywire-100-percent-v1";
 let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 root.innerHTML=groups.map(g=>'<section class="completion-group" data-group="'+g.id+'"><div class="completion-group-head"><div><small>'+g.weight+'% OF TOTAL</small><h3>'+g.title+'</h3></div><b data-group-count="'+g.id+'">0 / '+g.items.length+'</b></div><div class="completion-items">'+g.items.map((it,i)=>'<label class="completion-item"><input type="checkbox" data-completion="'+g.id+'-'+i+'" '+(saved[g.id+"-"+i]?"checked":"")+'><span><b>'+esc(it[0])+'</b><small>'+esc(it[1])+'</small></span></label>').join("")+'</div></section>').join("");
 function update(save=true){
  let total=0;
  groups.forEach(g=>{
   const checks=[...root.querySelectorAll('[data-completion^="'+g.id+'-"]')],done=checks.filter(x=>x.checked).length;
   total+=g.weight*(done/g.items.length);
   const counter=root.querySelector('[data-group-count="'+g.id+'"]');if(counter)counter.textContent=done+" / "+g.items.length;
  });
  const value=Math.round(total);pct.textContent=value+"%";fill.style.width=value+"%";
  if(save){saved={};root.querySelectorAll("[data-completion]").forEach(x=>saved[x.dataset.completion]=x.checked);try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}}
 }
 root.addEventListener("change",e=>{if(e.target.matches("[data-completion]"))update(true);});
 reset.addEventListener("click",()=>{root.querySelectorAll("[data-completion]").forEach(x=>x.checked=false);saved={};try{localStorage.removeItem(key);}catch(e){}update(false);});
 update(false);
})();

/* Collectibles and activity progress log */
(function initCollectionLog(){
 const grid=document.getElementById("collectionGrid"),done=document.getElementById("collectionDone"),fill=document.getElementById("collectionFill"),reset=document.getElementById("collectionReset");
 if(!grid||!done||!fill||!reset)return;
 const data=[
  ["Collectible Card Sets","COLLECTIBLES",15,"sets","Complete 15 of the 18 collectible card sets. There are 480 individual cards across all sets.","https://www.pushsquare.com/guides/gta-6-collectible-card-locations"],
  ["Kenton Treasure Sets","UNDERWATER",5,"sets","Five sets count toward the story completion row; all seven are needed to cover every underwater discovery.","https://www.pushsquare.com/guides/gta-6-underwater-discoveries-locations-and-kentons-treasures"],
  ["Underwater Discoveries","UNDERWATER",33,"discoveries","Find all 33 underwater discoveries. These are linked to Kenton's seven treasure sets.","https://www.pushsquare.com/guides/gta-6-underwater-discoveries-locations-and-kentons-treasures"],
  ["WAiNK Locations","SCANS",100,"scans","Scan 100 landmarks, sculptures and other marked points while on foot using the WAiNK app.","https://www.powerpyx.com/gta-6-all-waink-scan-locations/"],
  ["Magazines, Books & Comics","READABLES",30,"unique items","Find any 30 of the 34 combined unique magazines, books, comics and book swaps.","https://www.powerpyx.com/gta-6-all-magazines-books-comics-locations/"],
  ["Meditation Spots","ACTIVITIES",15,"meditations","Complete 15 of the 18 meditation spots. Both protagonists can count at the same location.","https://www.powerpyx.com/gta-6-all-meditation-spots-locations/"],
  ["Cocaine Flamingos","COLLECTIBLES",100,"flamingos","Destroy at least 100 of the 125 collectible flamingos.","https://www.powerpyx.com/gta-6-all-cocaine-flamingos-locations/"],
  ["Unique Playlists","MUSIC",2,"playlists","Complete both unique playlists.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
  ["Discovered Styles","STYLE",70,"styles","Discover at least 70 of 79 styles.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
  ["Basketball Hoops","SPORT",90,"hoops","Score at 90 of the 100 basketball hoops.","https://www.pushsquare.com/guides/gta-6-basketball-hoop-locations"],
  ["Drone Time Trials","TIME TRIALS",42,"trials","Complete all 42 drone time trials.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
  ["Animals Studied","WILDLIFE",100,"animals","Study at least 100 of the 255 animals for the Discovery requirement.","https://www.powerpyx.com/gta-6-all-animals-locations/"],
  ["Stunts","CHALLENGES",300,"stunts","Complete 300 of the 397 stunt activities counted by the 100% checklist.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"]
 ];
 const key="vicecitywire-collection-log-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 grid.innerHTML=data.map((x,i)=>'<article class="collection-card"><div class="collection-card-top"><span>'+esc(x[1])+'</span><small>TARGET · '+x[2]+'</small></div><h3>'+esc(x[0])+'</h3><p>'+esc(x[4])+'</p><div class="collection-entry"><label for="collection-'+i+'">YOUR PROGRESS</label><div><input id="collection-'+i+'" type="number" min="0" max="'+x[2]+'" step="1" value="'+Math.min(x[2],Math.max(0,Number(saved[i])||0))+'" data-collection="'+i+'"><span>/ '+x[2]+' '+esc(x[3])+'</span></div></div><div class="collection-track"><span data-collection-fill="'+i+'"></span></div><a href="'+x[5]+'" target="_blank" rel="noopener">OPEN LOCATION GUIDE ↗</a></article>').join("");
 function update(save=true){
  let completed=0;
  data.forEach((x,i)=>{const input=grid.querySelector('[data-collection="'+i+'"]');const value=Math.min(x[2],Math.max(0,Number(input.value)||0));if(value>=x[2])completed++;const bar=grid.querySelector('[data-collection-fill="'+i+'"]');bar.style.width=(value/x[2]*100)+"%";});
  done.textContent=completed+" / "+data.length;fill.style.width=(completed/data.length*100)+"%";
  if(save){saved={};grid.querySelectorAll("[data-collection]").forEach(input=>saved[input.dataset.collection]=Math.max(0,Number(input.value)||0));try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}}
 }
 grid.addEventListener("input",e=>{if(e.target.matches("[data-collection]")){const x=data[Number(e.target.dataset.collection)];e.target.value=Math.min(x[2],Math.max(0,Number(e.target.value)||0));update(true);}});
 reset.addEventListener("click",()=>{grid.querySelectorAll("[data-collection]").forEach(input=>input.value=0);try{localStorage.removeItem(key);}catch(e){}update(false);});
 update(false);
})();

/* Wildlife field guide and personal study log */
(function initWildlifeDatabase(){
 const animals=[
  ["American alligator","Land animals","Grassrivers swamps and canals; also reported around Vice City","documented","Trailer 1 / in-game log"],
  ["Wild boar","Land animals","Mount Kalaga National Park; shady woodland by day, more active at night","documented","Trailer / hunting deck"],
  ["Bobcat","Land animals","Grassrivers","documented","Official screenshot"],
  ["Cane toad","Land animals","Grassrivers wetlands; hunting target around Buckskin swamps and Pelican Valley","documented","Game Informer / in-game"],
  ["Cat","Land animals","Vice City streets and residential areas","documented","Trailer"],
  ["Chihuahua","Land animals","Vice City residential areas","documented","Trailer"],
  ["White-tailed deer","Land animals","Mount Kalaga National Park and areas near water; Abandoned Concrete Plant hunting area","documented","Official screenshot / hunting guide"],
  ["Fox","Land animals","Mount Kalaga National Park","documented","Official screenshot"],
  ["German Shepherd","Land animals","Vice City and Leonida neighbourhoods","documented","Game Informer"],
  ["Green iguana","Land animals","Leonida Keys","documented","Official screenshot"],
  ["Nile monitor","Land animals","Grassrivers wetlands; Buckskin swamps and Pelican Valley hunting area","documented","Launch trailer / in-game"],
  ["Nine-banded armadillo","Land animals","Mount Kalaga rural country","documented","Game Informer"],
  ["Raccoon","Land animals","Mount Kalaga National Park","documented","Official screenshot"],
  ["Rhesus macaque","Land animals","Grassrivers region","documented","Game Informer"],
  ["Rottweiler","Land animals","Vice City and Ambrosia areas","documented","Press preview"],
  ["Eastern spotted skunk","Land animals","Mount Kalaga grassy areas; nocturnal","documented","In-game"],
  ["Nutria","Land animals","Buckskin swamps and Pelican Valley","documented","In-game hunting deck"],
  ["Beaver","Land animals","Grassrivers","documented","Official screenshot"],
  ["River otter","Land animals","Leonida rivers and wetlands","documented","In-game guide"],
  ["Opossum","Land animals","Yards, woodland and roadsides","documented","In-game guide"],
  ["Rat","Land animals","Vice City alleys and docks","documented","In-game guide"],
  ["Cow","Land animals","Rural farms and ranches","documented","In-game guide"],
  ["Frog","Land animals","Ponds, ditches and swamps","documented","In-game guide"],
  ["Double-crested cormorant","Birds","Grassrivers waterways","documented","Trailer"],
  ["Duck","Birds","Leonida lakes and canals","documented","Trailer"],
  ["American flamingo","Birds","Leonida Keys lagoons and wetlands","documented","Trailer / Game Informer"],
  ["Great blue heron","Birds","Grassrivers wetlands","documented","Launch trailer"],
  ["Brown pelican","Birds","Leonida Keys and coastal marinas","documented","Extended Look"],
  ["Pigeon","Birds","Vice City urban areas","documented","Official website"],
  ["Seagull","Birds","Vice City, Port Gellhorn and Leonida Keys coast","documented","Official website"],
  ["Roseate spoonbill","Birds","Grassrivers wetlands","documented","Game Informer"],
  ["Whooping crane","Birds","Grassrivers wetlands","documented","Game Informer"],
  ["Wild turkey","Birds","Mount Kalaga grassy and wooded country","documented","In-game"],
  ["Bald eagle","Birds","Lakes and open country","documented","In-game guide"],
  ["Bottlenose dolphin","Sea life","Leonida coastal waters","documented","Ultimate Edition screenshot"],
  ["Eel","Sea life","Leonida Keys underwater areas","documented","Official screenshot"],
  ["Reef fish","Sea life","Reefs and underwater areas around Leonida Keys","documented","Official screenshot"],
  ["Shark","Sea life","Offshore waters around Leonida","documented","Rockstar species list / EDGE"],
  ["Hammerhead shark","Sea life","Coastal and offshore waters","documented","EDGE magazine"],
  ["Jellyfish","Sea life","Leonida coastal waters","documented","Game Informer"],
  ["Orca (killer whale)","Sea life","Offshore waters","documented","Extended Look"],
  ["Lionfish","Sea life","Underwater areas around Leonida Keys","documented","Official screenshot"],
  ["West Indian manatee","Sea life","Leonida waterways and coastal waters","documented","Extended Look"],
  ["Sea turtle","Sea life","Leonida Keys","documented","Official screenshot"],
  ["Stingray","Sea life","Leonida coastal waters","documented","Extended Look"],
  ["Largemouth bass","Sea life","Freshwater fishing locations","documented","Game Informer"],
  ["Mountain lion","Land animals","Unconfirmed habitat; fan-wiki listing only","rumour","Fan-wiki rumour"],
  ["Black bear","Land animals","Unconfirmed; leak-only sighting","rumour","Leak only"],
  ["Osprey","Birds","Unconfirmed; leak-only sighting","rumour","Leak only"],
  ["Great white shark","Sea life","Unconfirmed; no cited official image","rumour","Fan-wiki rumour"],
  ["Common snook","Sea life","Unconfirmed; listed without official source","rumour","Unverified listing"]
 ];
 const grid=document.getElementById("wildlifeGrid"),search=document.getElementById("wildlifeSearch"),type=document.getElementById("wildlifeType"),status=document.getElementById("wildlifeStatus"),count=document.getElementById("wildlifeCount"),fill=document.getElementById("wildlifeFill");
 if(!grid||!search||!type||!status||!count||!fill)return;
 const key="vicecitywire-wildlife-studied-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase();
  const list=animals.map((a,i)=>({...{name:a[0],group:a[1],habitat:a[2],status:a[3],source:a[4]},i})).filter(a=>(type.value==="all"||a.group===type.value)&&(status.value==="all"||a.status===status.value)&&(a.name+" "+a.group+" "+a.habitat).toLowerCase().includes(q));
  grid.innerHTML=list.length?list.map(a=>'<article class="db-card wildlife-card"><div class="db-card-top"><span class="db-type">'+esc(a.group)+'</span><span class="db-status '+(a.status==="rumour"?"wildlife-rumour":"")+'">'+(a.status==="rumour"?"UNVERIFIED RUMOUR":"DOCUMENTED")+'</span></div><h3>'+esc(a.name)+'</h3><p class="wildlife-habitat"><b>HABITAT</b> · '+esc(a.habitat)+'</p><p class="wildlife-source">SOURCE STATUS · '+esc(a.source)+'</p><label class="wildlife-check"><input type="checkbox" data-animal="'+a.i+'" '+(saved[a.i]?"checked":"")+'><span>MARK AS STUDIED</span></label></article>').join(""):'<div class="db-empty">No matching animals. Try another search or filter.</div>';
 }
 function update(save=true){
  const total=Object.values(saved).filter(Boolean).length;
  count.textContent=total+" / 100 studied";fill.style.width=Math.min(100,total)+"%";
  if(save)try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}
 }
 grid.addEventListener("change",e=>{const cb=e.target.closest("[data-animal]");if(!cb)return;saved[cb.dataset.animal]=cb.checked;update(true);});
 search.addEventListener("input",render);type.addEventListener("change",render);status.addEventListener("change",render);render();update(false);
})();

/* Hunting field database and personal log */
(function initHuntingDatabase(){
 const animals=[
 ["American Alligator","Wetland","Shrewsbury SM-69","Grassrivers wetlands"],
 ["American Black Bear","Forest / Wetland","Shrewsbury SM-69","Northern forest and wetland areas"],
 ["American Crocodile","Coastal","Shrewsbury SM-69","Coastal areas"],
 ["American Red Fox","Forest / Westland","Hawk & Little Mediator","Woodland and western countryside"],
 ["Blue Axanthic Iguana","Coastal / Urban","Wortham W-22","Southern coastal and urban areas"],
 ["Box Turtle","Coastal / Forest / Urban / Westland","Wortham W-22","Mixed habitats across Leonida"],
 ["Cane Toad","Coastal / Westland","Wortham W-22","Buckskin swamps and western lowlands"],
 ["Eastern Cottontail Rabbit","Forest / Wetland","Wortham W-22","Woodland and wetlands"],
 ["Eastern Diamondback Rattlesnake","Coastal / Forest","Wortham W-22","Coastal scrub and woodland"],
 ["Eastern Gray Squirrel","Coastal / Forest / Urban / Wetland","Wortham W-22","Mixed habitats"],
 ["Eastern Spotted Skunk","Forest / Urban / Wetland","Wortham W-22","Woodland and grassy areas; nocturnal"],
 ["Gray Fox","Forest / Westland","Hawk & Little Mediator","Woodland and western countryside"],
 ["Green Iguana","Coastal / Urban / Westland","Wortham W-22","Leonida Keys and warmer southern areas"],
 ["Leonida Bobcat","Forest / Wetland","Hawk & Little Mediator","Woodland and wetland edges"],
 ["Leonida Cottonmouth","Coastal / Westland","Wortham W-22","Wet coastal lowlands"],
 ["Leonida Wild Turkey","Forest / Wetland","Wortham W-22","Grassy and forested areas"],
 ["Leonida Wild White Tom","Forest / Wetland","Wortham W-22","Grassy and forested areas; rare white variant"],
 ["Mosaic Mottled Duck","Wetland","Wortham W-22","Freshwater wetlands; rare colour variant"],
 ["Mottled Duck","Wetland","Wortham W-22","Freshwater wetlands"],
 ["Nile Monitor","Wetland","Wortham W-22","West and East Buckskin Swamp; Pelican Valley"],
 ["Nine-Banded Armadillo","Forest","Wortham W-22","Rural woodland"],
 ["Northern Coyote","Forest / Wetland","Hawk & Little Mediator","Woodland and wetlands"],
 ["Nutria","Wetland","Wortham W-22","Buckskin swamps and Pelican Valley"],
 ["Piebald Whitetail Buck","Forest / Wetland","Shrewsbury SM-69","Forests and wetlands; rare coat variant"],
 ["Round-Tailed Muskrat","Westland","Wortham W-22","Western lowlands"],
 ["Snapping Turtle","Wetland","Wortham W-22","Wetlands and slow-moving waterways"],
 ["White River Otter","Wetland","Wortham W-22","Rivers and wetlands; rare pale variant"],
 ["Whitetail Deer","Wetland / Forest","Wortham W-22","Forested areas and near streams"],
 ["Wild Boar","Forest / Westland","Shrewsbury SM-69","Mount Kalaga woodland; more active at night"]
 ];
 const grid=document.getElementById("huntingGrid"),search=document.getElementById("huntingSearch"),habitat=document.getElementById("huntingHabitat"),weapon=document.getElementById("huntingWeapon"),count=document.getElementById("huntingCount"),fill=document.getElementById("huntingFill"),reset=document.getElementById("huntingReset");
 if(!grid||!search||!habitat||!weapon||!count||!fill||!reset)return;
 const key="vicecitywire-hunting-log-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase();
  const list=animals.map((a,i)=>({name:a[0],habitat:a[1],weapon:a[2],area:a[3],i})).filter(a=>(habitat.value==="all"||a.habitat.includes(habitat.value))&&(weapon.value==="all"||a.weapon===weapon.value)&&(a.name+" "+a.habitat+" "+a.weapon+" "+a.area).toLowerCase().includes(q));
  grid.innerHTML=list.length?list.map(a=>'<article class="db-card hunting-card"><div class="db-card-top"><span class="db-type">HUNTING LOG</span><span class="db-status">'+(saved[a.i]?"LOGGED":"NOT LOGGED")+'</span></div><h3>'+esc(a.name)+'</h3><p><b>HABITAT</b> · '+esc(a.habitat)+'</p><p><b>REPORTED AREA</b> · '+esc(a.area)+'</p><p><b>WEAPON SUGGESTION</b> · '+esc(a.weapon)+'</p><label class="hunting-check"><input type="checkbox" data-hunt="'+a.i+'" '+(saved[a.i]?"checked":"")+'><span>MARK AS LOGGED</span></label></article>').join(""):'<div class="db-empty">No matching animals. Try another search or filter.</div>';
 }
 function update(save=true){const total=Object.values(saved).filter(Boolean).length;count.textContent=total+" / "+animals.length+" logged";fill.style.width=(total/animals.length*100)+"%";if(save)try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}}
 grid.addEventListener("change",e=>{const cb=e.target.closest("[data-hunt]");if(!cb)return;saved[cb.dataset.hunt]=cb.checked;update(true);render();});
 search.addEventListener("input",render);habitat.addEventListener("change",render);weapon.addEventListener("change",render);
 reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(e){}render();update(false);});
 render();update(false);
})();

/* Fishing species database and personal catch log */
(function initFishingDatabase(){
 const fish=[
 ["Atlantic Tarpon","Key Lento"],["Spotted Moray Eel","Key Lento"],["Greater Amberjack","Key Lento"],["Lake Chubsucker","Key Lento"],["Striped Bass","Key Lento"],["Bluegill","Key Lento"],["American Eel","Key Lento"],["Permit","Watson Bay"],["Blue Striped Grunt","Watson Bay"],["Redbreast Sunfish","Watson Bay"],["Spanish Mackerel","Watson Bay"],["Littlehead Porgy","Watson Bay"],["Great Barracuda","Hamlet"],["Atlantic Herring","Key Lento"],["Candy Fish","Capri"],["Red Northern Snapper","Capri"],["Yellowtail Snapper","Capri"],["Red Lionfish","Gloriana Key"],["Green Moray Eel","Gloriana Key"],["Florida Gar","Vice City"],["Common Snook","Vice Beach"],["Salt Fish","Vice City"],["Cobia","Ambrosia"],["Redfin Pickerel","Ambrosia"],["Mahi-Mahi","Capri"],["Yellowfin Tuna","Port Gellhorn"],["Black Drum","Port Gellhorn"],["Sea Rock Bass","Ambrosia"],["Channel Catfish","Ambrosia"],["Atlantic Spadefish","Vice Beach"],["Stoplight Parrotfish","Waning Sands"],["Hogfish","Waning Sands"],["Largemouth Bass","Ambrosia"],["Tiger Grouper","Ambrosia"],["Black Grouper","Port Gellhorn"]
 ];
 const grid=document.getElementById("fishingGrid"),search=document.getElementById("fishingSearch"),region=document.getElementById("fishingRegion"),status=document.getElementById("fishingStatus"),count=document.getElementById("fishingCount"),fill=document.getElementById("fishingFill"),reset=document.getElementById("fishingReset");
 if(!grid||!search||!region||!status||!count||!fill||!reset)return;
 const key="vicecitywire-fishing-log-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase();
  const list=fish.map((a,i)=>({name:a[0],spot:a[1],i,caught:!!saved[i]})).filter(a=>(region.value==="all"||a.spot===region.value)&&(status.value==="all"||(status.value==="caught"?a.caught:!a.caught))&&(a.name+" "+a.spot).toLowerCase().includes(q));
  grid.innerHTML=list.length?list.map(a=>'<article class="db-card fishing-card"><div class="db-card-top"><span class="db-type">FISHING LOG / '+String(a.i+1).padStart(2,"0")+'</span><span class="db-status">'+(a.caught?"CAUGHT":"NOT CAUGHT")+'</span></div><h3>'+esc(a.name)+'</h3><p><b>REPORTED HOTSPOT</b> · '+esc(a.spot)+'</p><a class="fishing-map-link" href="https://www.gtabase.com/gta-6/map/?feature=fishing" target="_blank" rel="noopener">OPEN FISHING MAP ↗</a><label class="fishing-check"><input type="checkbox" data-fish="'+a.i+'" '+(a.caught?"checked":"")+'><span>MARK AS CAUGHT</span></label></article>').join(""):'<div class="db-empty">No matching fish. Try another search or filter.</div>';
 }
 function update(save=true){const total=Object.values(saved).filter(Boolean).length;count.textContent=total+" / "+fish.length+" caught";fill.style.width=(total/fish.length*100)+"%";if(save)try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}}
 grid.addEventListener("change",e=>{const cb=e.target.closest("[data-fish]");if(!cb)return;saved[cb.dataset.fish]=cb.checked;update(true);render();});
 search.addEventListener("input",render);region.addEventListener("change",render);status.addEventListener("change",render);
 reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(e){}render();update(false);});
 render();update(false);
})();


/* Collectible card set directory and personal completion tracker */
(function initCardSetDirectory(){
 const grid=document.getElementById("cardSetGrid"),search=document.getElementById("cardSetSearch"),status=document.getElementById("cardSetStatus"),count=document.getElementById("cardSetCount"),fill=document.getElementById("cardSetFill"),reset=document.getElementById("cardSetReset");
 if(!grid||!search||!status||!count||!fill||!reset)return;
 const sets=[["Vice City Flamingos",24],["Vice City Narcos",24],["Vice City Manatees",24],["Vice City Club de Fútbol",30],["Liberty City Swingers",24],["Liberty City Penetrators",24],["Liberty City Wrath",24],["Los Santos Corkers",24],["Los Santos Panic",24],["Los Santos Pounders",24],["Backyard Wrestling",12],["America's Next Top Hooker",24],["Delights Dancers",18],["Jack of Hearts",36],["Nine1Nine",36],["The Legends of Ratface",36],["Right Wing: America's Hero",36],["ED Comics Universe",36]];
 const key="vicecitywire-card-sets-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){const q=search.value.trim().toLowerCase(),f=status.value;const list=sets.map((x,i)=>({name:x[0],cards:x[1],i,done:!!saved[i]})).filter(x=>(!q||x.name.toLowerCase().includes(q))&&(f==="all"||(f==="found"&&x.done)||(f==="missing"&&!x.done)));
 grid.innerHTML=list.length?list.map(x=>'<article class="db-card card-set-card"><div class="db-card-top"><span class="db-type">CARD SET · '+String(x.i+1).padStart(2,"0")+'</span><span class="db-status">'+(x.done?"COMPLETED":"IN PROGRESS")+'</span></div><h3>'+esc(x.name)+'</h3><p>'+x.cards+' cards in this set · fixed standard pickup locations; random cards may also contribute to progress.</p><label class="card-set-check"><input type="checkbox" data-card-set="'+x.i+'" '+(x.done?"checked":"")+'><span>MARK SET COMPLETE</span></label><a href="https://www.pushsquare.com/guides/gta-6-collectible-card-locations" target="_blank" rel="noopener">OPEN CARD LOCATION INDEX ↗</a></article>').join(""):'<div class="db-empty">No matching card sets. Adjust your search or filter.</div>';
 const done=sets.filter((x,i)=>saved[i]).length;count.textContent=done+" / 18 sets";fill.style.width=(done/18*100)+"%";
 }
 grid.addEventListener("change",e=>{if(e.target.matches("[data-card-set]")){saved[e.target.dataset.cardSet]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}render();}});
 search.addEventListener("input",render);status.addEventListener("change",render);reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(e){}render();});render();
})();

/* Full GTA VI trophy and achievement tracker */
(function initTrophyTracker(){
 const grid=document.getElementById("trophyGrid"),search=document.getElementById("trophySearch"),grade=document.getElementById("trophyGrade"),category=document.getElementById("trophyCategory"),status=document.getElementById("trophyStatus"),count=document.getElementById("trophyCount"),fill=document.getElementById("trophyFill"),score=document.getElementById("trophyScore"),reset=document.getElementById("trophyReset");
 if(!grid||!search||!grade||!category||!status||!count||!fill||!score||!reset)return;
 const rows=[
 ["Vice Got a Price!","Platinum",0,"Unlock every other trophy. Congratulations! You're a Leonida Legend.","Hidden / Misc.",false],
 ["Just Like Paradise","Bronze",5,"Complete Gone Fishing.","Story",true],
 ["Paradise Lost","Bronze",20,"Complete Chapter 1.","Story",true],
 ["T**s Ass Drug Money","Bronze",20,"Complete Chapter 2.","Story",true],
 ["Vice City, Baby!","Bronze",20,"Complete Chapter 3.","Story",true],
 ["Top Of The World, Ma","Bronze",20,"Complete Chapter 4.","Story",true],
 ["You Gotta Know When to Get Off","Gold",50,"Complete the final mission.","Story",true],
 ["Trust","Bronze",10,"Complete Breakfast Run.","Story",true],
 ["Break the Bank","Bronze",25,"Complete The Cartel Heist.","Story",true],
 ["Family Matters","Bronze",15,"Complete Child's Play.","Story",true],
 ["DWNFALL","Bronze",15,"Complete Headliners.","Story",true],
 ["Hi-Jacked","Bronze",25,"Complete VCIA Takedown.","Story",true],
 ["Snow Storm","Bronze",25,"Complete Operation Savage Glory.","Story",true],
 ["A Long Road","Gold",100,"Attain 100% completion.","Activities",false],
 ["Cunning Stunts","Silver",40,"Complete 250 stunts.","Activities",false],
 ["Master of None","Bronze",20,"Try each type of activity once. (9 total)","Activities",false],
 ["The Shootist","Silver",40,"Earn a gold medal in all 42 Shooting Range challenges.","Activities",false],
 ["Top Fun","Bronze",15,"Win a Top Fun Drone Race at every location. (14 total)","Activities",false],
 ["Earn Cash, Not Kudos","Bronze",20,"Win 20 different races.","Activities",false],
 ["Baited My Tackle","Bronze",10,"Beat Cal in a fishing challenge.","Activities",false],
 ["Stick Fiddler","Bronze",10,"Complete an arcade game.","Activities",false],
 ["Road to Rehabilitation","Bronze",15,"Complete the final mission for Andy.","Story",false],
 ["This Was No Boat Accident","Bronze",15,"Complete the final mission for Kenton.","Story",false],
 ["The Lone Rider","Bronze",15,"Complete the final mission for Billy.","Story",false],
 ["Strangers & Freaks","Silver",30,"Complete 8 mission strands for strangers across Leonida.","Story",false],
 ["Supply & Demand","Bronze",20,"Complete the final mission for Randy.","Story",false],
 ["Spin On This!","Bronze",15,"Complete the final mission for Tyrone.","Story",false],
 ["Positive Mental Attitude","Bronze",10,"Meditate at every spot across Leonida. (18 total)","Activities",false],
 ["Fair Game","Bronze",15,"Hunt a unique GTA VI animal for Bret.","Activities",false],
 ["Don't Touch My Deck","Silver",30,"Complete 3 Collectible Card sets.","Collectibles",false],
 ["You WAiNKer!","Silver",30,"WAiNK it at 100 locations.","Collectibles",false],
 ["One Last Thing","Bronze",5,"Complete 50 Challenges.","Activities",false],
 ["Hot Together","Bronze",20,"Lose a 4-star Wanted Level with your partner and escape the heat.","Combat & Crime",false],
 ["Retail Therapy","Bronze",20,"Rob 3 shops back-to-back with your partner without losing your Wanted Level.","Combat & Crime",false],
 ["Whip It Good","Bronze",20,"Discover 100 vehicles.","Exploration",false],
 ["Gunslinger","Bronze",10,"Take down 5 enemies in a single use of Combat Focus.","Combat & Crime",false],
 ["Catch Me If You Can","Bronze",10,"Make an unscheduled departure at VCIA.","Hidden / Misc.",false],
 ["Challenging Tank","Bronze",10,"Kinda hot in these Rhinos.","Combat & Crime",false],
 ["Sneakthief","Bronze",10,"Rob a jewelry store without being detected.","Combat & Crime",false],
 ["Maximum Withdrawal","Silver",40,"Rob 5 Bank Vaults and escape.","Combat & Crime",false],
 ["A Classic Blitz Play","Bronze",10,"Rob an Armored Truck and escape.","Combat & Crime",false],
 ["The Goodtime State","Bronze",20,"Explore all of Leonida.","Exploration",false],
 ["Pest Control","Bronze",20,"Rob an Illegal Operation belonging to each gang. (9 total)","Combat & Crime",false],
 ["In The Beginning…","Bronze",5,"Enjoy a cocktail with a view on Ocean Beach.","Hidden / Misc.",false],
 ["Capital Offense","Bronze",5,"Smash your way out of a vehicle showroom in classic style.","Hidden / Misc.",false],
 ["Let's Go Bowling","Bronze",5,"Follow-through at the Kolt & Associates' bowling alley.","Hidden / Misc.",false],
 ["Personal Best","Bronze",5,"A partnership with mass appeal.","Hidden / Misc.",true],
 ["Actions Speak Louder","Bronze",5,"Choices made (for better or worse). (500 total)","Hidden / Misc.",true],
 ["Bad Luck, I Guess","Bronze",5,"Second time's the charm.","Hidden / Misc.",true],
 ["The Truth Is Out There","Bronze",5,"What the hell just happened?","Hidden / Misc.",true],
 ["Ten Pin","Bronze",5,"Bowl 'em over with a melee drive-by.","Combat & Crime",false],
 ["Dime on the Dollar","Bronze",20,"Earn $250,000 laundering Marked Bills through your contacts.","Activities",false],
 ["Treat Yo Self","Bronze",15,"Spend $100,000 across all shops.","Activities",false],
 ["Little Boxes","Bronze",15,"Purchase all garage properties. (8 total)","Exploration",false],
 ["On the Spot","Bronze",15,"Register 10 vehicles to the Scooter Bros app.","Activities",false]
 ];
 const key="vicecitywire-trophy-log-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase(),g=grade.value,c=category.value,s=status.value;
  const list=rows.map((x,i)=>({...x,i,earned:!!saved[i]})).filter(x=>(g==="all"||x[1]===g)&&(c==="all"||x[4]===c)&&(s==="all"||(s==="earned"&&x.earned)||(s==="missing"&&!x.earned))&&(x.slice(0,5).join(" ").toLowerCase().includes(q)));
  grid.innerHTML=list.length?list.map(x=>'<article class="db-card trophy-card"><div class="db-card-top"><span class="db-type">'+esc(x[4])+'</span><span class="trophy-grade grade-'+x[1].toLowerCase()+'">'+esc(x[1].toUpperCase())+'</span></div><h3>'+esc(x[0])+'</h3><p>'+esc(x[3])+'</p><div class="trophy-meta">'+(x[2]?x[2]+'G':'PLATINUM / 0G')+(x[5]?' · HIDDEN TROPHY':'')+'</div><label class="trophy-check"><input type="checkbox" data-trophy="'+x.i+'" '+(x.earned?'checked':'')+'><span>MARK AS UNLOCKED</span></label></article>').join(""):'<div class="db-empty">No matching trophies. Adjust your search or filters.</div>';
  const earned=rows.reduce((n,x,i)=>n+(saved[i]?1:0),0),points=rows.reduce((n,x,i)=>n+(saved[i]?x[2]:0),0);count.textContent=earned+" / "+rows.length+" unlocked";fill.style.width=(earned/rows.length*100)+"%";score.textContent=points+" / 1,000G";
 }
 grid.addEventListener("change",e=>{if(e.target.matches("[data-trophy]")){saved[e.target.dataset.trophy]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}render();}});
 [search,grade,category,status].forEach(x=>x.addEventListener(x===search?"input":"change",render));
 reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(e){}render();});render();
})();

/* Leonida day-by-day itinerary planner */
(function initTripPlanner(){
 const day=document.getElementById("tripDayName"),region=document.getElementById("tripRegion"),name=document.getElementById("tripStopName"),type=document.getElementById("tripStopType"),note=document.getElementById("tripStopNote"),add=document.getElementById("tripAddStop"),list=document.getElementById("tripStopList"),summary=document.getElementById("tripSummary"),reset=document.getElementById("tripReset"),copy=document.getElementById("tripExport");
 if(!day||!region||!name||!type||!note||!add||!list||!summary||!reset||!copy)return;
 const key="vicecitywire-trip-planner-v1";let state={day:"Day 1 — Vice City",region:"Vice City",stops:[]};try{state={...state,...JSON.parse(localStorage.getItem(key)||"{}")};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 day.value=state.day||"";region.value=state.region||"Vice City";
 function save(){state.day=day.value;state.region=region.value;try{localStorage.setItem(key,JSON.stringify(state));}catch(e){}}
 function render(){
  list.innerHTML=state.stops.length?state.stops.map((x,i)=>'<article class="trip-stop '+(x.visited?"visited":"")+'"><div class="trip-stop-number">'+String(i+1).padStart(2,"0")+'</div><div class="trip-stop-main"><div class="trip-stop-top"><span>'+esc(x.type)+'</span><b>'+esc(x.name)+'</b></div><p>'+esc(x.note||"No note added")+'</p><small>'+esc(x.region)+'</small></div><div class="trip-stop-actions"><label><input type="checkbox" data-visit="'+i+'" '+(x.visited?"checked":"")+'> VISITED</label><button type="button" data-up="'+i+'" '+(i===0?"disabled":"")+' aria-label="Move stop up">↑</button><button type="button" data-down="'+i+'" '+(i===state.stops.length-1?"disabled":"")+' aria-label="Move stop down">↓</button><button type="button" data-remove="'+i+'" aria-label="Remove stop">×</button></div></article>').join(""):'<div class="db-empty">No stops added yet. Add your first destination above or load a starter route.</div>';
  const visited=state.stops.filter(x=>x.visited).length;summary.textContent=state.stops.length+" stops · "+visited+" visited";save();
 }
 function addStop(n,t,r,nt){if(!n.trim())return;state.stops.push({name:n.trim(),type:t,region:region.value,note:nt.trim(),visited:false});name.value="";note.value="";save();render();}
 add.addEventListener("click",()=>addStop(name.value,type.value,region.value,note.value));
 name.addEventListener("keydown",e=>{if(e.key==="Enter")add.click();});
 day.addEventListener("input",save);region.addEventListener("change",save);
 list.addEventListener("change",e=>{if(e.target.matches("[data-visit]")){state.stops[+e.target.dataset.visit].visited=e.target.checked;save();render();}});
 list.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const i=Number(b.dataset.up??b.dataset.down??b.dataset.remove);if(b.hasAttribute("data-remove"))state.stops.splice(i,1);else if(b.hasAttribute("data-up")&&i>0)[state.stops[i-1],state.stops[i]]=[state.stops[i],state.stops[i-1]];else if(b.hasAttribute("data-down")&&i<state.stops.length-1)[state.stops[i+1],state.stops[i]]=[state.stops[i],state.stops[i+1]];save();render();});
 reset.addEventListener("click",()=>{state.stops=[];save();render();});
 copy.addEventListener("click",()=>{const textOut=[state.day+" — "+state.region,...state.stops.map((x,i)=>(i+1)+". ["+(x.visited?"x":" ")+"] "+x.name+" ("+x.type+")"+(x.note?" — "+x.note:""))].join("\n");if(navigator.clipboard?.writeText)navigator.clipboard.writeText(textOut).then(()=>{copy.textContent="COPIED";setTimeout(()=>copy.textContent="COPY ITINERARY",1600);}).catch(()=>{copy.textContent="COPY BLOCKED";});});
 document.getElementById("tripViceTemplate")?.addEventListener("click",()=>{region.value="Vice City";state.day="Day 1 — Vice City";day.value=state.day;state.region=region.value;state.stops=[{name:"Vice Beach",type:"Landmark",region:"Vice City",note:"Start with the beachfront",visited:false},{name:"Washington Island",type:"Landmark",region:"Vice City",note:"Explore the island district",visited:false},{name:"Trinity Apartments",type:"Secret / Easter egg",region:"Vice City",note:"Check the Dexter apartment reference",visited:false},{name:"Ocean Beach",type:"Activity",region:"Vice City",note:"Finish with the waterfront",visited:false}];save();render();});
 document.getElementById("tripWildTemplate")?.addEventListener("click",()=>{region.value="Mount Kalaga";state.day="Day 1 — Leonida Outdoors";day.value=state.day;state.region=region.value;state.stops=[{name:"Mount Kalaga National Park",type:"Wildlife / hunting / fishing",region:"Mount Kalaga",note:"Wildlife study and hiking",visited:false},{name:"Abandoned Concrete Plant",type:"Landmark",region:"Mount Kalaga",note:"Check the hunting area",visited:false},{name:"Buckskin Swamps",type:"Wildlife / hunting / fishing",region:"Grassrivers",note:"Wetland wildlife and fishing",visited:false},{name:"Key Lento",type:"Activity",region:"Leonida Keys",note:"Finish at the fishing charter area",visited:false}];save();render();});
 render();
})();


/* Official GTA VI character profile index */
(function initCharacterDatabase(){
 const grid=document.getElementById("characterGrid"),search=document.getElementById("characterSearch"),role=document.getElementById("characterRole"),status=document.getElementById("characterStatus"),count=document.getElementById("characterCount"),tracked=document.getElementById("characterTracked"),fill=document.getElementById("characterTrackFill"),reset=document.getElementById("characterReset");
 if(!grid||!search||!role||!status||!count||!tracked||!fill||!reset)return;
 const rows=[
  {name:"Jason Duval",role:"protagonist",tag:"MAIN PROTAGONIST",type:"Criminal world",bio:"Former Army serviceman who grew up around grifters and crooks. He now works for local drug runners in the Leonida Keys and is looking for a different path.",links:"Lucia Caminos · Brian Heder · Cal Hampton",credit:"Dylan Rourke"},
  {name:"Lucia Caminos",role:"protagonist",tag:"MAIN PROTAGONIST",type:"Criminal world",bio:"Recently released from Leonida Penitentiary. Her father taught her to fight, and she is determined to build the life her mother wanted for her. Her partnership with Jason is central to the story premise.",links:"Jason Duval",credit:"Manni L. Perez"},
  {name:"Cal Hampton",role:"supporting",tag:"SUPPORTING CHARACTER",type:"Criminal world",bio:"Jason's friend and a fellow associate of Brian. He feels safest at home, listening to Coast Guard communications and following his own suspicious theories.",links:"Jason Duval · Brian Heder",credit:"Bobby Moynihan"},
  {name:"Boobie Ike",role:"supporting",tag:"SUPPORTING CHARACTER",type:"Music industry",bio:"A Vice City figure who turned his street experience into a legitimate business empire spanning real estate, a strip club and a recording studio. He is partnered with Dre'Quan at Only Raw Records.",links:"Dre'Quan Priest · Only Raw Records",credit:"Mike Forbs"},
  {name:"Dre'Quan Priest",role:"supporting",tag:"SUPPORTING CHARACTER",type:"Music industry",bio:"An aspiring music mogul and former street dealer focused on making it in the music business. He partners with Boobie and has signed Real Dimez to Only Raw Records.",links:"Boobie Ike · Real Dimez · Only Raw Records",credit:"Naiqui Macabroad"},
  {name:"Real Dimez",role:"supporting",tag:"DUO / SHARED PROFILE",type:"Music industry",bio:"Rap duo made up of longtime friends Bae-Luxe and Roxy. After an early hit with local rapper DWNPLY, they are signed to Only Raw Records and trying to repeat their success.",links:"Bae-Luxe · Roxy Rashad · Dre'Quan Priest · DWNPLY",credit:"Bae-Luxe: Hood Brat · Roxy: Krissy Celess"},
  {name:"Raul Bautista",role:"supporting",tag:"SUPPORTING CHARACTER",type:"Criminal world",bio:"A seasoned bank robber known for confidence, charm and cunning. He recruits people willing to take risks for high rewards, while his recklessness raises the stakes for his crew.",links:"His robbery crew (individual members not specified in this profile)",credit:"Manny Perez"},
  {name:"Brian Heder",role:"supporting",tag:"SUPPORTING CHARACTER",type:"Criminal world",bio:"A veteran Keys drug runner who still moves product through his boat yard. He lets Jason live at one of his rental properties in return for help with local shakedowns.",links:"Jason Duval · Cal Hampton · Lori Heder",credit:"Stephen Root"}
 ];
 const key="vicecitywire-character-review-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase(),r=role.value,s=status.value;
  const list=rows.map((x,i)=>({...x,i,done:!!saved[i]})).filter(x=>(r==="all"||x.role===r||(r==="criminal"&&x.type==="Criminal world")||(r==="music"&&x.type==="Music industry"))&&(s==="all"||(s==="reviewed"&&x.done)||(s==="unreviewed"&&!x.done))&&[x.name,x.tag,x.type,x.bio,x.links,x.credit].join(" ").toLowerCase().includes(q));
  grid.innerHTML=list.length?list.map(x=>'<article class="character-card"><div class="character-card-top"><span>'+esc(x.tag)+'</span><small>ROCKSTAR PROFILE</small></div><h3>'+esc(x.name)+'</h3><p>'+esc(x.bio)+'</p><div class="character-facts"><div><small>STATED CONNECTIONS</small><b>'+esc(x.links)+'</b></div><div><small>OFFICIAL GAME CREDIT</small><b>'+esc(x.credit)+'</b></div></div><label class="character-check"><input type="checkbox" data-character="'+x.i+'" '+(x.done?'checked':'')+'><span>MARK PROFILE AS REVIEWED</span></label></article>').join(""):'<div class="db-empty">No matching character profiles. Adjust your search or filters.</div>';
  const done=rows.reduce((n,x,i)=>n+(saved[i]?1:0),0);count.textContent=list.length+" / "+rows.length;tracked.textContent=done+" / "+rows.length;fill.style.width=(done/rows.length*100)+"%";
 }
 grid.addEventListener("change",e=>{if(e.target.matches("[data-character]")){saved[e.target.dataset.character]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}render();}});
 [search].forEach(x=>x.addEventListener("input",render));[role,status].forEach(x=>x.addEventListener("change",render));
 reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(e){}render();});render();
})();


/* Leonida gangs, crews and law-enforcement directory */
(function initFactionDatabase(){
 const grid=document.getElementById("factionGrid"),search=document.getElementById("factionSearch"),kind=document.getElementById("factionKind"),evidence=document.getElementById("factionEvidence"),status=document.getElementById("factionStatus"),count=document.getElementById("factionCount"),tracked=document.getElementById("factionTracked"),fill=document.getElementById("factionTrackFill"),reset=document.getElementById("factionReset");
 if(!grid||!search||!kind||!evidence||!status||!count||!tracked||!fill||!reset)return;
 const rows=[
 {name:"PTT Youngin$",kind:"gang",type:"Southside street gang",area:"Southside, Vice City",evidence:"official",basis:"Rockstar explicitly describes them as one of Southside Vice City's loudest gangs; Ultimate Edition content includes a raid on their Illegal Goods Store.",source:"Rockstar character / edition material"},
 {name:"Final Chapter MC",kind:"gang",type:"Outlaw motorcycle club",area:"Ambrosia",evidence:"game",basis:"Rockstar describes a local biker gang in Ambrosia. The name Final Chapter MC is read from club patches in official imagery and catalogued by community databases.",source:"Rockstar region text + screenshot identification"},
 {name:"San4San",kind:"gang",type:"Haitian street gang (community classification)",area:"Vice City · La Perle (reported)",evidence:"game",basis:"The name is visible in game material. The Haitian classification and base are community-database descriptions, not a published Rockstar gang biography.",source:"In-game name + GTABase / GTATracker classification"},
 {name:"Guardia Brothers",kind:"gang",type:"Cuban crime family (community classification)",area:"Little Cuba, Vice City (reported)",evidence:"community",basis:"Listed as a criminal family by GTATracker. Treat the organisation type and reported base as database classification, not Rockstar-authored lore.",source:"GTATracker community database"},
 {name:"M7",kind:"gang",type:"Salvadoran street gang (community classification)",area:"Hamlet (reported)",evidence:"community",basis:"Listed as a Salvadoran street gang by GTATracker. The group's wider story role and leadership are not established here.",source:"GTATracker community database"},
 {name:"Kolt & Associates",kind:"gang",type:"Gulf Coast criminal clan (community classification)",area:"Port Gellhorn (reported)",evidence:"community",basis:"Listed as a criminal clan by GTATracker. Do not assume the name describes a conventional corporation or a full territory boundary.",source:"GTATracker community database"},
 {name:"Kingfishers",kind:"gang",type:"Swamp smuggling gang (community classification)",area:"Grassrivers (reported)",evidence:"community",basis:"Listed as a smuggling gang by GTATracker and associated with the Grassrivers area. Exact leadership and boundaries are not asserted.",source:"GTATracker community database"},
 {name:"La Polilla Negra",kind:"gang",type:"Colombian drug cartel (community classification)",area:"North-west of the Grassrivers (reported)",evidence:"community",basis:"Listed as a drug cartel by GTATracker. Its classification and operating area are attributed to that database.",source:"GTATracker community database"},
 {name:"Brian Heder's operation",kind:"crew",type:"Keys drug-running network",area:"Leonida Keys",evidence:"official",basis:"Rockstar describes Brian as a drug runner moving product through his boat yard. Jason works for local drug runners and helps Brian with local shakedowns.",source:"Rockstar character biography"},
 {name:"Raul Bautista's crew",kind:"crew",type:"Bank-robbery crew",area:"Vice City / Leonida (exact base not stated)",evidence:"official",basis:"Rockstar describes Raul as a seasoned bank robber recruiting people for high-risk scores. The crew has no official group name in the biography.",source:"Rockstar character biography"},
 {name:"Devil's Dozen",kind:"crew",type:"Criminal group",area:"Hangar / mission-linked (reported)",evidence:"community",basis:"Listed by GTATracker as a criminal group associated with Donnie's contacts in the Clear Skies mission.",source:"GTATracker mission-linked listing"},
 {name:"Aviators Crew",kind:"crew",type:"Local crew",area:"Key Lento (reported)",evidence:"community",basis:"Listed by GTATracker as a local crew encountered by Jason in Key Lento.",source:"GTATracker mission-linked listing"},
 {name:"Ambrosia County Sheriff",kind:"law",type:"County law enforcement",area:"Ambrosia County",evidence:"game",basis:"Listed as a law-enforcement agency in the post-release faction database.",source:"GTATracker database"},
 {name:"Ambrosia Police Department",kind:"law",type:"Town police department",area:"Ambrosia",evidence:"game",basis:"Listed as a local police department in the post-release faction database.",source:"GTATracker database"},
 {name:"Capri Police Department",kind:"law",type:"City police department",area:"Capri",evidence:"game",basis:"Listed as a city police department in the post-release faction database.",source:"GTATracker database"},
 {name:"Key Lento Police Department",kind:"law",type:"Local police department",area:"Key Lento",evidence:"game",basis:"Listed as a local police department in the post-release faction database.",source:"GTATracker database"},
 {name:"Leonard County Sheriff's Office",kind:"law",type:"County law enforcement",area:"Leonard County",evidence:"game",basis:"Listed as a sheriff's office in the post-release faction database.",source:"GTATracker database"},
 {name:"Mariana County Sheriff's Office",kind:"law",type:"County law enforcement",area:"Mariana County",evidence:"game",basis:"Listed as a sheriff's office in the post-release faction database.",source:"GTATracker database"},
 {name:"Leonida Highway Patrol",kind:"law",type:"State highway patrol",area:"Leonida",evidence:"game",basis:"Listed as a state highway patrol agency in the post-release faction database.",source:"GTABase / GTATracker"},
 {name:"National Coast Guard",kind:"law",type:"Coast guard service",area:"Leonida coastal waters",evidence:"game",basis:"Listed as a coast guard service in the post-release faction database.",source:"GTATracker database"},
 {name:"Leonida Department of Corrections",kind:"law",type:"State prison authority",area:"Leonida",evidence:"game",basis:"Listed as a state prison authority in the post-release faction database.",source:"GTATracker database"},
 {name:"Protection of Animals & Controlled Hunting (POACH)",kind:"law",type:"Wildlife / hunting enforcement",area:"Leonida wilderness",evidence:"game",basis:"Listed as a law-enforcement agency in the post-release faction database.",source:"GTABase / GTATracker"},
 {name:"Port Gellhorn Police Department",kind:"law",type:"Local police department",area:"Port Gellhorn",evidence:"game",basis:"Listed as a local police department in the post-release faction database.",source:"GTABase / GTATracker"},
 {name:"Vice Beach Police Department",kind:"law",type:"Local police department",area:"Vice Beach",evidence:"game",basis:"Listed as a local police department in the post-release faction database.",source:"GTABase / GTATracker"},
 {name:"Vice City Police Department",kind:"law",type:"City police department",area:"Vice City",evidence:"game",basis:"Listed as a city police department in the post-release faction database.",source:"GTABase / GTATracker"},
 {name:"Vice-Dale Police Department",kind:"law",type:"Local police department",area:"Vice-Dale",evidence:"game",basis:"Listed as a local police department in the post-release faction database.",source:"GTABase / GTATracker"},
 {name:"Waning Sands Police Department",kind:"law",type:"City police department",area:"Waning Sands",evidence:"game",basis:"Listed as a city police department in the post-release faction database.",source:"GTATracker database"}
 ];
 const key="vicecitywire-faction-review-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(e){}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const labels={official:"ROCKSTAR-STATED",game:"IN-GAME / VISUAL",community:"COMMUNITY CLASSIFICATION"};
 function render(){
  const q=search.value.trim().toLowerCase(),k=kind.value,e=evidence.value,s=status.value;
  const list=rows.map((x,i)=>({...x,i,done:!!saved[i]})).filter(x=>(k==="all"||x.kind===k)&&(e==="all"||x.evidence===e)&&(s==="all"||(s==="reviewed"&&x.done)||(s==="unreviewed"&&!x.done))&&[x.name,x.type,x.area,x.basis,x.source].join(" ").toLowerCase().includes(q));
  grid.innerHTML=list.length?list.map(x=>'<article class="faction-card"><div class="faction-card-top"><span class="faction-kind">'+(x.kind==="law"?"LAW ENFORCEMENT":x.kind==="crew"?"LOCAL CREW":"CRIMINAL GROUP")+'</span><span class="faction-evidence evidence-'+x.evidence+'">'+labels[x.evidence]+'</span></div><h3>'+esc(x.name)+'</h3><div class="faction-type">'+esc(x.type)+'</div><div class="faction-area"><small>REPORTED AREA</small><b>'+esc(x.area)+'</b></div><p>'+esc(x.basis)+'</p><div class="faction-source">SOURCE: '+esc(x.source)+'</div><label class="faction-check"><input type="checkbox" data-faction="'+x.i+'" '+(x.done?'checked':'')+'><span>MARK AS REVIEWED</span></label></article>').join(""):'<div class="db-empty">No matching factions. Adjust your search or filters.</div>';
  const done=rows.reduce((n,x,i)=>n+(saved[i]?1:0),0);count.textContent=list.length+" / "+rows.length;tracked.textContent=done+" / "+rows.length;fill.style.width=(done/rows.length*100)+"%";
 }
 grid.addEventListener("change",e=>{if(e.target.matches("[data-faction]")){saved[e.target.dataset.faction]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved));}catch(e){}render();}});
 search.addEventListener("input",render);[kind,evidence,status].forEach(x=>x.addEventListener("change",render));
 reset.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(e){}render();});render();
})();


/* Evidence-led character, business and place relationship graph */
(function initRelationshipGraph(){
 const svg=document.getElementById("relationshipGraph"),detail=document.getElementById("networkDetail"),count=document.getElementById("networkCount");
 if(!svg||!detail||!count)return;
 const nodes=[
  {id:"jason",name:"Jason Duval",kind:"people",x:150,y:115,desc:"Former Army serviceman working for local drug runners in the Leonida Keys. Brian lets him live at one of his properties in return for local work.",source:"Rockstar character biography"},
  {id:"lucia",name:"Lucia Caminos",kind:"people",x:150,y:35,desc:"Recently released from Leonida Penitentiary. Rockstar places her partnership with Jason at the centre of the story.",source:"Rockstar character biography"},
  {id:"cal",name:"Cal Hampton",kind:"people",x:355,y:75,desc:"Jason's friend and a fellow associate of Brian. Cal monitors Coast Guard communications from home.",source:"Rockstar character biography"},
  {id:"brian",name:"Brian Heder",kind:"people",x:555,y:135,desc:"Veteran Keys drug runner who moves product through his boat yard. He houses Jason and uses him for local shakedowns.",source:"Rockstar character biography"},
  {id:"lori",name:"Lori Heder",kind:"people",x:735,y:35,desc:"Brian's third wife, mentioned in Rockstar's official biography of Brian.",source:"Rockstar character biography"},
  {id:"raul",name:"Raul Bautista",kind:"people",x:150,y:360,desc:"Seasoned bank robber recruiting people willing to take risks for high rewards. Rockstar does not name his crew members in the profile.",source:"Rockstar character biography"},
  {id:"boobie",name:"Boobie Ike",kind:"people",x:790,y:280,desc:"Vice City businessman with interests in real estate, a strip club and a recording studio. His partnership with Dre'Quan is a priority.",source:"Rockstar character biography"},
  {id:"drequan",name:"Dre'Quan Priest",kind:"people",x:970,y:280,desc:"Aspiring music mogul building Only Raw Records. He has signed Real Dimez.",source:"Rockstar character biography"},
  {id:"real",name:"Real Dimez",kind:"people",x:1060,y:390,desc:"Rap duo formed by longtime friends Bae-Luxe and Roxy. The duo is signed to Only Raw Records.",source:"Rockstar character biography"},
  {id:"dwnply",name:"DWNPLY",kind:"people",x:900,y:430,desc:"Local rapper who collaborated with Real Dimez on an early hit single.",source:"Rockstar character biography"},
  {id:"keys",name:"Leonida Keys",kind:"places",x:405,y:285,desc:"The region where Jason works for local drug runners and Brian operates his boat yard.",source:"Rockstar region and character biographies"},
  {id:"vice",name:"Vice City",kind:"places",x:790,y:160,desc:"The city where Boobie Ike's business empire and Only Raw Records are based.",source:"Rockstar character biography"},
  {id:"yard",name:"Brian's boat yard",kind:"business",x:560,y:385,desc:"Brian continues to move product through his boat yard in the Keys.",source:"Rockstar character biography"},
  {id:"onlyraw",name:"Only Raw Records",kind:"business",x:990,y:170,desc:"Record label developed by Dre'Quan in partnership with Boobie Ike. Real Dimez are signed to the label.",source:"Rockstar character biography"},
  {id:"studio",name:"Recording studio",kind:"business",x:700,y:405,desc:"Part of Boobie Ike's legitimate business empire; the official biography does not provide a precise map address here.",source:"Rockstar character biography"},
  {id:"club",name:"Boobie's strip club",kind:"business",x:720,y:330,desc:"A venue in Boobie's business empire where Dre'Quan books acts. Not treated as an exact mapped location.",source:"Rockstar character biography"},
  {id:"crew",name:"Raul's robbery crew",kind:"business",x:330,y:425,desc:"An unnamed group of people Raul recruits for high-risk bank robberies. Individual members are not confirmed in this profile.",source:"Rockstar character biography"}
 ];
 const edges=[
  ["jason","lucia","story partners"],["jason","cal","friends"],["cal","brian","associates"],["jason","brian","rents from / works for"],["brian","lori","married"],["jason","keys","works in"],["brian","keys","operates in"],["brian","yard","moves product through"],["boobie","drequan","business partners"],["drequan","onlyraw","runs label"],["boobie","onlyraw","business partnership"],["real","onlyraw","signed act"],["dwnply","real","early hit collaboration"],["boobie","vice","business base"],["boobie","studio","owns / operates"],["boobie","club","owns / operates"],["raul","crew","recruits for robberies"]
 ];
 const byId=Object.fromEntries(nodes.map(n=>[n.id,n]));let activeFilter="all";
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const visible=nodes.filter(n=>activeFilter==="all"||n.kind===activeFilter);
  const ids=new Set(visible.map(n=>n.id));
  const shownEdges=edges.filter(e=>ids.has(e[0])&&ids.has(e[1]));
  count.textContent=visible.length+" NODES · "+shownEdges.length+" CONNECTIONS";
  const lineSvg=shownEdges.map(e=>{const a=byId[e[0]],b=byId[e[1]],mx=(a.x+b.x)/2,my=(a.y+b.y)/2-9;return '<g class="network-edge"><line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'"></line><text x="'+mx+'" y="'+my+'">'+esc(e[2])+'</text></g>';}).join("");
  const nodeSvg=visible.map(n=>'<g class="network-node '+n.kind+'" data-node="'+n.id+'" tabindex="0" role="button" aria-label="View '+esc(n.name)+'"><circle cx="'+n.x+'" cy="'+n.y+'" r="25"></circle><text x="'+n.x+'" y="'+(n.y+43)+'">'+esc(n.name)+'</text></g>').join("");
  svg.innerHTML=lineSvg+nodeSvg;
 }
 function select(id){
  const n=byId[id];if(!n)return;
  const related=edges.filter(e=>e[0]===id||e[1]===id).map(e=>{const other=byId[e[0]===id?e[1]:e[0]];return {name:other.name,relation:e[2]};});
  detail.innerHTML='<small>'+n.kind.toUpperCase()+' / DOSSIER</small><h3>'+esc(n.name)+'</h3><p>'+esc(n.desc)+'</p><div class="network-related"><b>KNOWN CONNECTIONS</b>'+(related.length?related.map(x=>'<div><span>'+esc(x.relation)+'</span><strong>'+esc(x.name)+'</strong></div>').join(""):'<p>No separately confirmed links are listed.</p>')+'</div><span class="network-evidence">'+esc(n.source)+'</span>';
  svg.querySelectorAll(".network-node").forEach(el=>el.classList.toggle("selected",el.dataset.node===id));
 }
 svg.addEventListener("click",e=>{const g=e.target.closest("[data-node]");if(g)select(g.dataset.node);});
 svg.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-node]")){e.preventDefault();select(e.target.dataset.node);}});
 document.querySelectorAll("[data-network-filter]").forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.networkFilter;document.querySelectorAll("[data-network-filter]").forEach(x=>x.classList.toggle("active",x===btn));render();detail.innerHTML='<small>FILTER ACTIVE</small><h3>'+btn.textContent+'</h3><p>Select a node in the network to inspect its known connections.</p>'; }));
 render();select("jason");
})();


/* Business and property directory */
(function initBusinessDirectory(){
 const grid=document.getElementById("businessDirectoryGrid");if(!grid)return;
 const entries=[
  {n:"Only Raw Records",t:"Record label",r:"Vice City",k:"business",e:"Rockstar material",d:"Record label partnership between Boobie Ike and Dre'Quan Priest. Real Dimez are signed to the label."},
  {n:"Brian's Boat Works & Marina",t:"Boat yard / marina",r:"Leonida Keys",k:"business",e:"Rockstar material",d:"Brian Heder owns a boat yard in the Leonida Keys. The named sign appears in Rockstar-published imagery."},
  {n:"Jack of Hearts",t:"Strip club",r:"Vice City",k:"business",e:"Rockstar material",d:"Named in Boobie Ike's profile and visible in Rockstar imagery. The exact ownership link is not explicitly stated in the profile."},
  {n:"Rideout Customs",t:"Vehicle mod shop",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Mod shop included in the Ultimate Edition. Listed as an edition location, not a property to own."},
  {n:"Sara's Unisex Salon",t:"Salon",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Ultimate Edition salon offering grooming and appearance options for Jason and Lucia."},
  {n:"Stock 305",t:"Clothing store",r:"Stockyard",k:"business",e:"Rockstar material",d:"Clothing store included in the Ultimate Edition."},
  {n:"Electric Fang Tattoo",t:"Tattoo parlour",r:"Stockyard",k:"business",e:"Rockstar material",d:"Ultimate Edition tattoo parlour with a collection designed by artist collective FAILE."},
  {n:"One-Eyed Willie's",t:"Vehicle mod shop",r:"Lake Leonida",k:"business",e:"Rockstar material",d:"Ultimate Edition mod shop offering off-road modifications and hand-painted art."},
  {n:"PTT Youngin$ Compound",t:"Gang compound / illegal goods",r:"Southside Vice City",k:"business",e:"Rockstar material",d:"Compound associated with the PTT Youngin$ gang; Ultimate Edition access includes a raid for special items."},
  {n:"Megamundo",t:"Media company",r:"Vice City",k:"business",e:"Rockstar material",d:"Spanish-language media company; its first American headquarters opening is shown in published footage."},
  {n:"Effluvia",t:"Rooftop bar",r:"Vice City",k:"business",e:"Rockstar material",d:"Rooftop bar shown during a night out in Rockstar's extended look."},
  {n:"Delights Cabaret",t:"Strip club",r:"Port Gellhorn",k:"business",e:"Rockstar material",d:"Named venue visible on a lit sign in Rockstar's Port Gellhorn imagery."},
  {n:"Xero",t:"Gas station chain",r:"Ambrosia",k:"business",e:"Rockstar material",d:"Gas station branding, prices and a food mart appear in Rockstar's Ambrosia screenshot."},
  {n:"Conch King Seafood Kitchen",t:"Seafood restaurant",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Restaurant sign appears above a nighttime car meet in Rockstar imagery."},
  {n:"NINE1NINE",t:"Nightclub",r:"Vice City",k:"business",e:"Rockstar material",d:"Vice City club referenced by its banner in Trailer 1 and illuminated terrace in Trailer 2."},
  {n:"We Have Shoes",t:"Shoe store",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Roadside shoe-store sign visible in Trailer 1; exact district not specified."},
  {n:"Phil's Ammu-Nation",t:"Gun store",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Ammu-Nation storefront and television advertisement appear in Trailer 2."},
  {n:"Watkins Auto Parts",t:"Auto parts store",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Named auto-parts sign visible in Trailer 2."},
  {n:"Crossroad Park Minimall",t:"Retail centre",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Shopping-centre sign appears during a motorcycle chase in Trailer 2."},
  {n:"Leonida Marine Center",t:"Marine store",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Name printed on a shirt outside a marine-related store in Trailer 2."},
  {n:"Peewees",t:"Restaurant",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Mentioned in a Weazel News story about a dine-and-dash incident in Trailer 1."},
  {n:"Thrillbilly Mud Club",t:"Off-road club",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Off-road mud-party venue shown in Trailer 1."},
  {n:"Sinfrontera National Bank",t:"Bank",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Bank name appears on a security lockdown screen during a robbery sequence in Trailer 2."},
  {n:"Seven Seas Seafood",t:"Seafood restaurant",r:"Vice City",k:"business",e:"Rockstar material",d:"Named seafood sign appears in the Launch Trailer."},
  {n:"W. Blanco's Cuban Foods",t:"Food store",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Named Cuban-foods storefront appears in An Extended Look."},
  {n:"City Picnic Market",t:"Market",r:"Vice City",k:"business",e:"Rockstar material",d:"Market sign is visible at Thompson Avenue in An Extended Look."},
  {n:"Zeke's Gadgets",t:"Electronics / repair shop",r:"Vice City",k:"business",e:"Rockstar material",d:"Strip-mall gadget shop with repair signage shown in An Extended Look."},
  {n:"Diamond Dawgs",t:"Jewellery store",r:"Vice City",k:"business",e:"Rockstar material",d:"Jewellery and watch storefront visible in An Extended Look."},
  {n:"Video Forever",t:"Video store",r:"Vice City",k:"business",e:"Rockstar material",d:"Video shop with closing signs, shown beside Zeke's Gadgets."},
  {n:"Hobbs Milford",t:"Retail / commercial building",r:"Vice City",k:"business",e:"Rockstar material",d:"Business name appears on a curved white corner building in An Extended Look."},
  {n:"Lombank",t:"Bank",r:"Vice City",k:"business",e:"Rockstar material",d:"Bank branch signage appears in An Extended Look."},
  {n:"Fleeca",t:"Bank",r:"Vice City",k:"business",e:"Rockstar material",d:"Fleeca branch appears in Rockstar's Launch Gallery and branded material."},
  {n:"Jacob's Tavern",t:"Bar",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Tavern name is visible on a sign in an image shared with Edge; town not identified."},
  {n:"The Rusty Anchor",t:"Beach bar",r:"Leonida Keys",k:"business",e:"Rockstar material",d:"Beach bar named on its sign in Rockstar's Leonida Keys screenshot."},
  {n:"Ricardo's Tires",t:"Tyre shop / gas station",r:"Vice City",k:"business",e:"Rockstar material",d:"Tyre shop and gas-station branding visible in Rockstar's Vice City 22 screenshot."},
  {n:"RCS Trade Paints",t:"Paint supplier",r:"Vice City",k:"business",e:"Rockstar material",d:"Paint-supplier name appears on a building near Ricardo's Tires."},
  {n:"Avenue Contractors",t:"Contractor",r:"Vice City",k:"business",e:"Rockstar material",d:"Contractor signs visible on a building beside a canal in Rockstar's Vice City 17 screenshot."},
  {n:"The Atoll Bar and Grill",t:"Bar & grill",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Named sign appears beside a hotel pool in Rockstar's Vice City 26 screenshot."},
  {n:"Coastal Auto Care",t:"Auto repair shop",r:"Leonida Keys",k:"business",e:"Rockstar material",d:"Auto-care garage named in a weather forecast segment about heavy rain in the Keys."},
  {n:"Paradiso",t:"Venue",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Pink neon venue sign appears in a screenshot published with reviews."},
  {n:"Wyman's World Auto Salvage Co.",t:"Auto salvage yard",r:"Unknown / not specified",k:"business",e:"Rockstar material",d:"Salvage-yard name is printed on Wyman's shirt in Rockstar's Classic Car Collection screenshot."},
  {n:"Mitchell Auto Center",t:"Buyable garage · 1 vehicle",r:"Kelly County",k:"buyable",e:"Guide-reported",d:"Listed for $4,000 on Historic Route 628. Reported as purchasable after the Vice City Real Estate app unlocks."},
  {n:"Persistence Road Garage",t:"Buyable garage · 1 vehicle",r:"Unknown / not specified",k:"buyable",e:"Guide-reported",d:"Listed for $7,600 in Belville, Leonard County."},
  {n:"7th Avenue Garage",t:"Buyable garage · 1 vehicle",r:"Vice City",k:"buyable",e:"Guide-reported",d:"Listed for $12,000 in Salton, Vice City."},
  {n:"Store n' Bolt",t:"Buyable garage · 1 vehicle",r:"Ambrosia",k:"buyable",e:"Guide-reported",d:"Listed for $16,800 in Ambrosia, Kelly County."},
  {n:"Wyatt Motors",t:"Buyable garage · 1 vehicle",r:"Ambrosia",k:"buyable",e:"Guide-reported",d:"Listed for $21,600 near Allied Crystal, Ambrosia."},
  {n:"Vela Rota Driver Garage",t:"Buyable garage · 1 vehicle",r:"Unknown / not specified",k:"buyable",e:"Guide-reported",d:"Listed for $24,000 on Capri, Mariana County."},
  {n:"Bonita Court Garage",t:"Buyable garage · 1 vehicle",r:"Vice City",k:"buyable",e:"Guide-reported",d:"Listed for $34,000 in Vice Beach."},
  {n:"Atlantic Court Garage",t:"Buyable garage · 1 vehicle",r:"Vice City",k:"buyable",e:"Guide-reported",d:"Listed for $40,000 in Ocean Beach, Vice Beach."},
  {n:"Leonida Keys Safehouse",t:"Story safehouse",r:"Leonida Keys",k:"story",e:"Guide-reported",d:"Jason's first home on Key Lento; available from Chapter 1 through Brian. Not for sale."},
  {n:"Starlet Motel Safehouse",t:"Story safehouse",r:"Port Gellhorn",k:"story",e:"Guide-reported",d:"Story safehouse at the start of Chapter 2. Rent payments are not a property purchase."},
  {n:"Bayside Safehouse",t:"Story safehouse",r:"Vice City",k:"story",e:"Guide-reported",d:"Reported safehouse on Catalan Boulevard, Bayside; unlocks in Chapter 3."},
  {n:"Ocean Beach Safehouse",t:"Story safehouse",r:"Vice City",k:"story",e:"Guide-reported",d:"Reported safehouse in Ocean Beach, Vice Beach; unlocks in Chapter 4."},
  {n:"Port Gellhorn Station Garage",t:"Story garage",r:"Port Gellhorn",k:"story",e:"Guide-reported",d:"One-vehicle story garage reported after the Chapter 2 mission Daily Driver."},
  {n:"Thompson Court Garage",t:"Story garage",r:"Vice City",k:"story",e:"Guide-reported",d:"Two-vehicle garage in Ocean Beach, reported after the Chapter 4 mission Company Cars."},
  {n:"NE 15th Street Garage",t:"Story garage",r:"Stockyard",k:"story",e:"Guide-reported",d:"Two-vehicle story garage reported after the Chapter 5 mission Operation Savage Glory."},
  {n:"Pegassi Residences Garage",t:"Story garage",r:"Vice City",k:"story",e:"Guide-reported",d:"Three-vehicle story garage at Tequesta Retreat, reported after the Chapter 5 mission Operation Savage Glory."},
  {n:"Paradise Garage",t:"Ultimate Edition garage",r:"Watson Bay",k:"edition",e:"Rockstar material",d:"Ultimate Edition garage with a weapon locker and a place to stash stolen goods for fencing."},
  {n:"Shore Court Garage",t:"Pre-order bonus garage",r:"Vice City",k:"edition",e:"Rockstar material",d:"Personal garage near Ocean Beach, included with the Vintage Vice City pre-order bonus."},
  {n:"Crosstown Garage",t:"GTA+ garage",r:"Vice City",k:"edition",e:"Guide-reported",d:"Crosstown garage associated with GTA+ from Chapter 3 in community property guides; access conditions should be checked in-game."}
 ];
 const key="vcw_business_reviewed_v1";let reviewed=new Set();try{reviewed=new Set(JSON.parse(localStorage.getItem(key)||"[]"));}catch(e){}
 const $=id=>document.getElementById(id),search=$("businessSearch"),kind=$("businessKind"),region=$("businessRegion"),status=$("businessStatus");
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function save(){try{localStorage.setItem(key,JSON.stringify([...reviewed]));}catch(e){}}
 function render(){const q=search.value.trim().toLowerCase();const list=entries.filter(x=>(kind.value==="all"||x.k===kind.value)&&(region.value==="all"||x.r===region.value)&&(status.value==="all"||(status.value==="reviewed"?reviewed.has(x.n):!reviewed.has(x.n)))&&(!q||[x.n,x.t,x.r,x.d,x.e].join(" ").toLowerCase().includes(q)));$("businessCount").textContent=list.length+" / "+entries.length;$("businessReviewed").textContent=reviewed.size+" / "+entries.length;$("businessTrackFill").style.width=(reviewed.size/entries.length*100)+"%";grid.innerHTML=list.map(x=>'<article class="business-directory-card"><div class="business-card-top"><span>'+esc(x.t.toUpperCase())+'</span><small class="'+(x.e==="Guide-reported"?"business-evidence-guide":"business-evidence-rockstar")+'">'+esc(x.e)+'</small></div><h3>'+esc(x.n)+'</h3><div class="business-card-region"><small>AREA / REGION</small><b>'+esc(x.r)+'</b></div><p>'+esc(x.d)+'</p><label class="business-review-check"><input type="checkbox" data-business="'+esc(x.n)+'" '+(reviewed.has(x.n)?"checked":"")+'> MARK AS REVIEWED</label></article>').join("")||'<p class="business-empty">No matching entries. Try a different search or filter.</p>';grid.querySelectorAll("[data-business]").forEach(box=>box.addEventListener("change",()=>{box.checked?reviewed.add(box.dataset.business):reviewed.delete(box.dataset.business);save();render();}));}
 [search,kind,region,status].forEach(el=>el.addEventListener(el===search?"input":"change",render));$("businessReset").addEventListener("click",()=>{if(!confirm("Reset all reviewed business and property entries?"))return;reviewed.clear();save();render();});render();
})();
