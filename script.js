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
{name:"'55 Vapid Stanier",type:"car",label:"Classic sedan",maker:"Vapid",source:"Rockstar edition listing",status:"Officially named",note:"Vintage Vice City Pack vehicle with a garage.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"'95 Grotti Cheetah",type:"car",label:"Sports car",maker:"Grotti",source:"Rockstar edition listing",status:"Officially named",note:"Ultimate Edition vehicle.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"'67 Vapid Dominator Buggy",type:"car",label:"Off-road buggy",maker:"Vapid",source:"Rockstar edition listing",status:"Officially named",note:"Ultimate Edition off-road vehicle.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"Dinka Enduro",type:"bike",label:"Dirt bike",maker:"Dinka",source:"Rockstar edition listing",status:"Officially named",note:"Ultimate Edition motorcycle.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"Shitzu Squalo",type:"boat",label:"Speedboat",maker:"Shitzu",source:"Rockstar edition listing",status:"Officially named",note:"Ultimate Edition watercraft.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"Crest Kayak",type:"boat",label:"Kayak",maker:"Crest",source:"Rockstar edition listing",status:"Officially named",note:"Ultimate Edition watercraft.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"Ganado Retro Build",type:"car",label:"Custom classic build",maker:"Vapid",source:"Rockstar edition listing",status:"Officially named",note:"Custom build included with Ultimate Edition.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"Classic Car Collection",type:"car",label:"Classic car bundle",maker:"Multiple",source:"Rockstar edition listing",status:"Officially named",note:"Bundle; individual models are not all named in the edition summary.",url:"https://gta6.university/guides/gta-6-cars-vehicles/"},
{name:"Airboat 09",type:"boat",label:"Airboat",maker:"Airgator",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Vehicle name reported as legible in official footage.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"'85 Emperor",type:"car",label:"Sedan",maker:"Albany",source:"In-game panel capture",status:"Player-captured name",note:"Name reported from an in-game vehicle panel capture.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Schafter",type:"car",label:"Sedan",maker:"Benefactor",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Vehicle name reported as legible in official footage.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Bobcat",type:"utility",label:"Utility vehicle",maker:"Bobcat",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Utility vehicle name reported as legible in official footage.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"BTN Delmar",type:"boat",label:"Boat",maker:"Not confirmed",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Boat name reported from footage; manufacturer not established.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Granger",type:"car",label:"SUV",maker:"Declasse",source:"In-game panel capture",status:"Player-captured name",note:"Name reported from an in-game vehicle panel capture.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Deviant",type:"car",label:"Sports classic",maker:"Not confirmed",source:"Rockstar official render",status:"Name reported from render",note:"Model name appears in the vehicle index; manufacturer not established.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Como",type:"boat",label:"Boat",maker:"Dingus",source:"In-game panel capture",status:"Player-captured name",note:"Name reported from an in-game vehicle panel capture.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"'85 Blista",type:"car",label:"Compact",maker:"Dinka",source:"In-game panel capture",status:"Player-captured name",note:"Name reported from an in-game vehicle panel capture.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"L35P",type:"boat",label:"Boat",maker:"Lürepredator",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Watercraft name reported as legible in official footage.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Alvino V1",type:"bike",label:"Motorcycle",maker:"Principe",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Motorcycle name reported as legible in official footage.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Rancher",type:"utility",label:"Utility vehicle",maker:"Not confirmed",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Vehicle name reported as legible in official footage.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Seashark",type:"boat",label:"Personal watercraft",maker:"Not confirmed",source:"Rockstar footage / readable name",status:"Name reported from footage",note:"Personal watercraft name reported as legible in official footage.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Sirius",type:"car",label:"Sports classic",maker:"Not confirmed",source:"Rockstar official render",status:"Name reported from render",note:"Model name appears in the vehicle index; manufacturer not established.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Sandking XT",type:"utility",label:"Pickup",maker:"Vapid",source:"In-game panel capture",status:"Player-captured name",note:"Name reported from an in-game vehicle panel capture.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Stanier G2",type:"car",label:"Sedan",maker:"Vapid",source:"In-game panel capture",status:"Player-captured name",note:"Name reported from an in-game vehicle panel capture.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Jugular",type:"car",label:"Sedan",maker:"Ocelot",source:"In-game panel capture",status:"Player-captured name",note:"Name reported from an in-game vehicle panel capture.",url:"https://gtaplaybook.com/gta6/vehicles/"},
{name:"Riata",type:"car",label:"Off-road",maker:"Not confirmed",source:"Rockstar official render",status:"Name reported from render",note:"Off-road model name appears in the vehicle index.",url:"https://gtaplaybook.com/gta6/vehicles/"}
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
   const items=config.items.filter(x=>(kind==="all"||x.type===kind)&&(x.name+" "+x.label+" "+x.note+" "+x.maker+" "+x.status).toLowerCase().includes(q));
   if(!items.length){grid.innerHTML='<div class="db-empty">No matching entries. Try another search term or filter.</div>';return;}
   grid.innerHTML=items.map(x=>'<article class="db-card"><div class="db-card-top"><span class="db-type">'+escapeText(x.label)+'</span><span class="db-status">'+escapeText(x.status.toUpperCase())+'</span></div><h3>'+escapeText(x.name)+'</h3><p class="db-maker">MANUFACTURER · '+escapeText(x.maker)+'</p><p>'+escapeText(x.note)+'</p><div class="db-meta">SOURCE: '+escapeText(x.source.toUpperCase())+'<br><a href="'+x.url+'" target="_blank" rel="noopener">VERIFY SOURCE ↗</a></div></article>').join("");
  }
  search.addEventListener("input",render);select.addEventListener("change",render);render();
 }
 mount({grid:"vehicleGrid",search:"vehicleSearch",select:"vehicleType",items:vehicles});
 mount({grid:"weaponGrid",search:"weaponSearch",select:"weaponType",items:weapons});
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