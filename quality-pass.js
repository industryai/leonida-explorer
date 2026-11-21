/* VICECITYWIRE content audit pass: precise 100% weighting and complete activity tracker. */
(function(){
 "use strict";
 const $=id=>document.getElementById(id);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 
 /* The official in-game completion split is 50% story, 27% tasks, 20% exploration and 3% discovery. */
 const root=$("completionGroups"),fill=$("completionFill"),pct=$("completionPercent"),reset=$("completionReset");
 if(root&&fill&&pct&&reset){
  const groups=[
   {id:"story",title:"MAIN STORY",weight:50,items:[["Complete the main story","Finish the story through the end credits.",50]]},
   {id:"tasks",title:"STORY TASKS & ROBBERIES",weight:27,items:[
    ["Optional tasks","Complete at least 100 optional tasks.",6],
    ["Gang operations","Clear all 39 of 39 gang operations.",3],
    ["Bank jobs","Fully complete all 22 bank jobs.",2],
    ["Payday loan jobs","Fully complete all 7 payday loan jobs.",2],
    ["Smash ’N’ Grabs","Fully complete at least 34 of 35.",2],
    ["Stick Ups","Complete at least 50 of 91.",2],
    ["Narcotics fenced","Fence $100,000 worth of narcotics.",2],
    ["Jewelry fenced","Fence $100,000 worth of jewelry.",2],
    ["Marked bills fenced","Fence $250,000 worth of marked bills.",2],
    ["Vaults","Hit all 8 of 8 vaults.",2],
    ["Vehicles fenced","Fence $200,000 worth of vehicles.",2]
   ]},
   {id:"explore",title:"EXPLORATION & ACTIVITIES",weight:20,items:[
    ["Kenton treasure sets","Complete at least 5 of 7 sets.",1],
    ["Collectible card sets","Find at least 15 of 18 complete sets.",1],
    ["WAiNK locations","Scan 100 locations.",1],
    ["Underwater discoveries","Find all 33 discoveries.",1],
    ["Magazines, books & comics","Find at least 30 of 34 unique items.",1],
    ["Meditation spots","Complete at least 15 of 18.",1],
    ["Cocaine Flamingos","Destroy at least 100 of 125.",1],
    ["Unique playlists","Complete both playlists.",1],
    ["Discovered styles","Discover at least 70 of 79.",1],
    ["Unique races","Win at least 30 of 40.",1],
    ["Race challenge gold medals","Earn at least 10 of 13.",1],
    ["Shooting range gold medals","Earn all 42 of 42.",1],
    ["Video games","Play all 4 of 4.",1],
    ["Pool opponents","Defeat at least 5 of 7.",1],
    ["Mini golf","Play at 2 of 3 locations.",1],
    ["Basketball hoops","Score at 90 of 100 hoops.",1],
    ["Drone time trials","Complete all 42 of 42.",1],
    ["Stunts","Complete at least 300 of 397.",1],
    ["Challenges","Complete at least 70 of 80.",1],
    ["Bret’s Target Decks","Complete all 15 of 15.",1]
   ]},
   {id:"discovery",title:"DISCOVERY",weight:3,items:[
    ["Base model vehicles","Scan at least 200 of 277 base models.",1],
    ["Standard issue weapons","Find at least 50 of 66 standard weapons.",1],
    ["Animals studied","Study at least 100 of 255 animals.",1]
   ]}
  ];
  const key="vicecitywire-100-percent-v1";
  let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(_){}
  /* Migrate prior story/task rows without discarding the user's old checks. */
  for(let i=1;i<=11;i++){if(saved["story-"+i]!==undefined&&saved["tasks-"+(i-1)]===undefined)saved["tasks-"+(i-1)]=saved["story-"+i];}
  root.innerHTML=groups.map(g=>'<section class="completion-group" data-group="'+g.id+'"><div class="completion-group-head"><div><small>'+g.weight+'% OF TOTAL</small><h3>'+esc(g.title)+'</h3></div><b data-group-count="'+g.id+'">0 / '+g.items.length+'</b></div><div class="completion-items">'+g.items.map((it,i)=>'<label class="completion-item"><input type="checkbox" data-completion="'+g.id+'-'+i+'" '+(saved[g.id+"-"+i]?"checked":"")+'><span><b>'+esc(it[0])+'</b><small>'+esc(it[1])+'</small></span><em>'+it[2]+'%</em></label>').join("")+'</div></section>').join("");
  function update(save){
   let total=0;
   groups.forEach(g=>{
    let done=0;
    g.items.forEach((it,i)=>{const c=root.querySelector('[data-completion="'+g.id+"-"+i+'"]');if(c&&c.checked){done++;total+=it[2];}});
    const counter=root.querySelector('[data-group-count="'+g.id+'"]');if(counter)counter.textContent=done+" / "+g.items.length;
   });
   const value=Math.min(100,total);pct.textContent=value+"%";fill.style.width=value+"%";
   if(save){saved={};root.querySelectorAll("[data-completion]").forEach(c=>saved[c.dataset.completion]=c.checked);try{localStorage.setItem(key,JSON.stringify(saved));}catch(_){}}
  }
  root.addEventListener("change",e=>{if(e.target.matches("[data-completion]"))update(true);});
  reset.addEventListener("click",()=>{root.querySelectorAll("[data-completion]").forEach(c=>c.checked=false);saved={};try{localStorage.removeItem(key);}catch(_){}update(false);});
  update(false);
 }
 
 /* Expand the separate manual activity log to cover all 21 100%-relevant collection/activity lines. */
 const grid=$("collectionGrid"),done=$("collectionDone"),bar=$("collectionFill"),clear=$("collectionReset");
 if(grid&&done&&bar&&clear){
  const data=[
   ["Collectible Card Sets","COLLECTIBLES",15,"sets","Find at least 15 of 18 complete card sets (480 cards across the full set).","https://www.pushsquare.com/guides/gta-6-collectible-card-locations"],
   ["Kenton Treasure Sets","UNDERWATER",5,"sets","Complete at least 5 of 7 sets for the checklist; all 7 are linked to the 33 underwater discoveries.","https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/"],
   ["Underwater Discoveries","UNDERWATER",33,"discoveries","Find all 33 underwater discoveries. This is one of the requirements that needs its full total.","https://www.pushsquare.com/guides/gta-6-underwater-discoveries-locations-and-kentons-treasures"],
   ["WAiNK Locations","SCANS",100,"scans","Scan 100 landmarks, curiosities and sculptures with the WAiNK app.","https://www.powerpyx.com/gta-6-all-waink-scan-locations/"],
   ["Magazines, Books & Comics","READABLES",30,"unique items","Find any 30 of the 34 combined unique magazines, books, comics and book swaps.","https://www.powerpyx.com/gta-6-all-magazines-books-comics-locations/"],
   ["Meditation Spots","ACTIVITIES",15,"spots","Complete at least 15 of 18 meditation spots.","https://www.powerpyx.com/gta-6-all-meditation-spots-locations/"],
   ["Cocaine Flamingos","COLLECTIBLES",100,"flamingos","Destroy at least 100 of the 125 collectible flamingos.","https://www.powerpyx.com/gta-6-all-cocaine-flamingos-locations/"],
   ["Unique Playlists","MUSIC",2,"playlists","Complete both unique playlists.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Discovered Styles","STYLE",70,"styles","Discover at least 70 of 79 styles.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Unique Races","RACING",30,"races","Win at least 30 of 40 unique races.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Race Challenge Gold Medals","RACING",10,"gold medals","Earn at least 10 of 13 race challenge gold medals.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Shooting Range Gold Medals","SHOOTING",42,"gold medals","Earn all 42 shooting range gold medals.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Video Games","ARCADE",4,"games","Play all 4 listed video games.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Pool Opponents","SPORT",5,"opponents","Defeat at least 5 of 7 pool opponents.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Mini Golf Locations","SPORT",2,"locations","Play at 2 of 3 mini golf locations.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Basketball Hoops","SPORT",90,"hoops","Score at 90 of 100 different basketball hoops.","https://www.pushsquare.com/guides/gta-6-basketball-hoop-locations"],
   ["Drone Time Trials","TIME TRIALS",42,"trials","Complete all 42 drone time trials.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Stunts","CHALLENGES",300,"stunts","Complete at least 300 of 397 stunt activities (jumps, under-bridges, knife flights and base jumps).","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Challenges","CHALLENGES",70,"challenges","Complete at least 70 of 80 challenges.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Bret’s Target Decks","HUNTING",15,"decks","Complete all 15 target decks in Bret’s hunting questline.","https://www.powerpyx.com/gta-6-100-completion-checklist-guide/"],
   ["Animals Studied","WILDLIFE",100,"animals","Study at least 100 of the 255 animal-log entries. Studying is separate from hunting.","https://www.powerpyx.com/gta-6-all-animals-locations/"]
  ];
  const key="vicecitywire-collection-log-v2";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(_){}
  grid.innerHTML=data.map((x,i)=>'<article class="collection-card"><div class="collection-card-top"><span>'+esc(x[1])+'</span><small>TARGET · '+x[2]+'</small></div><h3>'+esc(x[0])+'</h3><p>'+esc(x[4])+'</p><div class="collection-entry"><label for="collection-v2-'+i+'">YOUR PROGRESS</label><div><input id="collection-v2-'+i+'" type="number" min="0" max="'+x[2]+'" step="1" value="'+Math.min(x[2],Math.max(0,Number(saved[i])||0))+'" data-collection-v2="'+i+'"><span>/ '+x[2]+' '+esc(x[3])+'</span></div></div><div class="collection-track"><span data-collection-v2-fill="'+i+'"></span></div><a href="'+x[5]+'" target="_blank" rel="noopener">OPEN GUIDE ↗</a></article>').join("");
  function update(save){
   let completed=0;
   data.forEach((x,i)=>{const input=grid.querySelector('[data-collection-v2="'+i+'"]');const value=Math.min(x[2],Math.max(0,Number(input.value)||0));if(value>=x[2])completed++;const track=grid.querySelector('[data-collection-v2-fill="'+i+'"]');track.style.width=(value/x[2]*100)+"%";});
   done.textContent=completed+" / "+data.length;bar.style.width=(completed/data.length*100)+"%";
   if(save){saved={};grid.querySelectorAll("[data-collection-v2]").forEach(input=>saved[input.dataset.collectionV2]=Math.max(0,Number(input.value)||0));try{localStorage.setItem(key,JSON.stringify(saved));}catch(_){}}
  }
  grid.addEventListener("input",e=>{if(e.target.matches("[data-collection-v2]")){const x=data[Number(e.target.dataset.collectionV2)];e.target.value=Math.min(x[2],Math.max(0,Number(e.target.value)||0));update(true);}});
  clear.addEventListener("click",()=>{grid.querySelectorAll("[data-collection-v2]").forEach(input=>input.value=0);saved={};try{localStorage.removeItem(key);}catch(_){}update(false);});
  update(false);
  const heading=$("collections")?.querySelector(".heading .status");if(heading)heading.textContent="21 TRACKED CATEGORIES";
 }
 
 /* Correct scope labels: these local catalogues are useful subsets, not complete game inventories. */
 const setText=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value;};
 setText('#vehicles .heading .status',"29 CATALOGUED RECORDS · PARTIAL INDEX");
 setText('#weapons .heading .status',"65 INDEX RECORDS · 66 STANDARD ISSUE TARGET");
 setText('#fishing .heading .status',"35 SPECIES · REPORTED AREAS");
 const missionStatus=document.querySelector('#missions .heading .status');if(missionStatus)missionStatus.textContent="91 MAIN STORY MISSIONS · 5 CHAPTERS";
 const missionNote=document.querySelector('#missions .spoiler-alert');if(missionNote)missionNote.textContent="SPOILER WARNING: The index covers 91 main-story missions across five chapters. Optional missions, side tasks and Strangers & Freaks are separate; mission order can vary. Three late-story titles remain spoiler-protected in this index.";
 const completionNote=document.querySelector('#completion .db-footnote');if(completionNote)completionNote.innerHTML='Weighting follows the published in-game split: Main Story 50%, Story Tasks 27%, Exploration & Activities 20%, Discovery 3%. Each checklist row carries its reported contribution. Progress is stored locally in this browser. <a href="https://www.powerpyx.com/gta-6-100-completion-checklist-guide/" target="_blank" rel="noopener">POWERPYX · 100% REQUIREMENTS ↗</a> · <a href="https://www.gtabase.com/articles/gta-6/gta-6-100-completion-guide-interactive-checklist" target="_blank" rel="noopener">GTABASE · WEIGHTED CHECKLIST ↗</a>';
 const vehicleNote=document.querySelector('#vehicles .db-footnote');if(vehicleNote)vehicleNote.textContent="This is a curated index of 29 named vehicle records, not the complete 277 base-model scan list or all 557 vehicle entries reported by current guides. Use the external map and database for the wider catalogue; local records only show names and evidence that have been transcribed here.";
 const weaponNote=document.querySelector('#weapons .db-footnote');if(weaponNote)weaponNote.textContent="This local index contains 65 named records and is not a complete inventory of every standard-issue weapon or unique variant. The reported 100% requirement is to find 50 of 66 standard-issue weapons (53 guns, 9 melee weapons and 4 explosives). Check the linked current weapon database for additions and availability.";
 const characterNote=document.querySelector('#characters .spoiler-alert');if(characterNote)characterNote.textContent="SCOPE NOTE: This directory contains 28 named character entries: eight Rockstar profile dossiers plus additional people identified in official media and post-release character references. Evidence level is stated per entry; one entry is explicitly marked unconfirmed. Performer credits are shown only where listed in the cited cast reference.";
 const fishingNote=document.querySelector('#fishing .spoiler-alert');if(fishingNote)fishingNote.textContent="This is a 35-species starter index with reported area labels, not a coordinate-accurate hotspot map. Fishing progress is a personal browser checklist and does not sync with the game save.";
 const trophyNote=document.querySelector("#trophies .spoiler-alert");if(trophyNote)trophyNote.textContent="SPOILER WARNING: Hidden trophy names and story requirements appear below. Potentially missable: Positive Mental Attitude may depend on the optional meditation with Lucia at Jason’s house during Chapter 1. Do this before leaving Chapter 1 if you want to avoid risk; the 100% completion checklist itself is not missable.";
 const characterHeading=document.querySelector("#characters .heading .status");if(characterHeading)characterHeading.textContent="28 NAMED ENTRIES · 8 ROCKSTAR PROFILES";const sourceBar=document.querySelector("#characters .heading");if(sourceBar&&!sourceBar.querySelector("[data-full-cast-link]")){const link=document.createElement("a");link.dataset.fullCastLink="1";link.className="btn";link.href="https://www.gta6database.com/database/characters";link.target="_blank";link.rel="noopener";link.textContent="OPEN FULL CAST REFERENCE ↗";sourceBar.appendChild(link);}
})();