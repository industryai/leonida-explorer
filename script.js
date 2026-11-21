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

/* Launch-week secrets and Easter eggs: status is based on independent published reports. */
(function initSecrets(){
 const items=[
  {name:"The Literal Easter Egg",type:"Easter egg",where:"Top of Vice City's tallest radio tower",detail:"Climb to the nest at the top of the tower, take a painted egg and throw it from the ledge to trigger a short scene.",status:"confirmed",source:"Windows Central",url:"https://www.windowscentral.com/gaming/gta-6-players-are-ignoring-crime-to-jet-ski-with-dogs-and-redecorate-their-bedrooms-the-funniest-clips-so-far"},
  {name:"The Skunk Ape",type:"Rare encounter",where:"Gullet Marsh / Cottonmouth Lake swamp area",detail:"Players report a Bigfoot-like creature in the wetlands. Reports differ on the precise encounter point; follow the in-game clues rather than relying on an exact pin.",status:"confirmed",source:"VICEGUIDE launch-day roundup",url:"https://viceguide.de/artikel/gta-6-easter-eggs-im-spiel"},
  {name:"Cool Dog & Dog Island",type:"Rare encounter",where:"Open water off the coast",detail:"When stranded far offshore, a dog wearing goggles may arrive on a jet ski and take the player to an island inhabited by dogs.",status:"confirmed",source:"Windows Central",url:"https://www.windowscentral.com/gaming/gta-6-players-are-ignoring-crime-to-jet-ski-with-dogs-and-redecorate-their-bedrooms-the-funniest-clips-so-far"},
  {name:"Dexter's Apartment",type:"Pop-culture reference",where:"Washington Island, Vice City",detail:"A building resembling Dexter Morgan's apartment from the television series Dexter has been spotted. Reports describe it as an exterior reference, not an explorable interior.",status:"reported",source:"VICEGUIDE launch-day roundup",url:"https://viceguide.de/artikel/gta-6-easter-eggs-im-spiel"},
  {name:"Giant Crab Ambush",type:"Easter egg",where:"Crab research site",detail:"Players have reported a giant-crab encounter at a research location. Exact approach and trigger details are still being cross-checked.",status:"reported",source:"Vice City DB discovery tracker",url:"https://vicecitydb.org/easter-eggs"},
  {name:"Kraken Sighting",type:"Unverified lead",where:"Open water",detail:"A large sea-creature sighting has circulated in early player footage, but the available reports are not yet strong enough to treat it as confirmed.",status:"reported",source:"Vice City DB discovery tracker",url:"https://vicecitydb.org/easter-eggs"}
 ];
 const grid=document.getElementById("secretGrid"),search=document.getElementById("secretSearch"),filter=document.getElementById("secretStatus");
 if(!grid||!search||!filter)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase(),status=filter.value;
  const found=items.filter(x=>(status==="all"||x.status===status)&&(x.name+" "+x.type+" "+x.where+" "+x.detail).toLowerCase().includes(q));
  grid.innerHTML=found.length?found.map((x,i)=>'<article class="secret-card"><div class="secret-card-top"><span>'+esc(x.type)+'</span><em class="'+(x.status==="confirmed"?"verified":"reported")+'">'+(x.status==="confirmed"?"CROSS-CHECKED":"REPORTED")+'</em></div><h3>'+esc(x.name)+'</h3><p class="secret-where">LOCATION · '+esc(x.where)+'</p><p>'+esc(x.detail)+'</p><a href="'+x.url+'" target="_blank" rel="noopener">SOURCE: '+esc(x.source.toUpperCase())+' ↗</a></article>').join(""):'<div class="db-empty">No matching discoveries. Try another search or status.</div>';
 }
 search.addEventListener("input",render);filter.addEventListener("change",render);render();
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
