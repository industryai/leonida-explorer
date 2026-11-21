/* Independent STORY renderer: keeps core story content available even if another module fails. */
(function(){
 "use strict";
 const $=id=>document.getElementById(id);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const chapters=[
 {id:1,name:"Just Like Paradise",items:["Prologue","Gone Fishing","Gear Up","Just a Scratch","Lab Fees","Unwanted Attention","Pipework","Hey Arnold!","Island Dreams","Feng Shui","Coming Home","Buck Me","Clean Up After Donnie","Down to Earth","Clear Skies","Day Release","Swamped","Don Gone","Recalibration","Tourist Trap","Home Sweet Home","Discharge Time"]},
 {id:2,name:"Paradise Lost",items:["What's in the Bag?","Ambulance Chaser","Just Moved In","Girls' Trip","Moses","Daily Driver","Slam Dunk","Breakfast Run","Coffee Break","Afternoon Delight","Thrillbillies","Twist Wrist, Smash, Grab","Checking Out"]},
 {id:3,name:"Tits, Ass, Drug Money",items:["Welcome to Vice City","Dealer's Choice","Meet the Heders","Dubious Provenance","Mami Knows Best","South Leonida Real Estate","Tyrone","Here, Kitty Kitty","Kitty Litter Labs","Car Service","Top Billing","Boobie Time","First Impressions","Caught Slipping","Crosstown Traffic","Credit Check","Steal the Zorrusso for Randy","Sinfrontera National Bank","Security Expert","Ride or Die","Company Property","The Missing Link","Safe Word","Cooties","Bricked Up","Hidden Charges","The Cartel Heist"]},
 {id:4,name:"Vice City, Baby",items:["Ocean Beach","Another Life","Company Cars","Lawyer Up","Party Hard","Heavy Lifting","Photo/Shoot","Making Gainz","Watch It","Cash Injections","Amateur Hour","Dirty Work","Too Much Baggage","Adventures in Babysitting","Fresh Evidence","Power Play","Child's Play","Headliners","Close Surveillance","Delivery Method","Team Building","Fully Catered","VCIA Takedown","Sunset"]},
 {id:5,name:"Top of the World, Ma",items:["Bird in the Hand","Taking Liberties","VC Baby","Doggie Bag","Operation Savage Glory","Protective Custody"]}
 ];
 const summaries={
 "Prologue":"Lucia's story opens while she is serving time at Leonida Penitentiary.",
 "Gone Fishing":"Jason and Donnie's work around the Keys introduces the risks of their smuggling operation.",
 "Gear Up":"Jason prepares equipment for the work ahead.",
 "Lab Fees":"Jason collects overdue money connected to Brian's local operation.",
 "Unwanted Attention":"Jason and Cal travel to Hamlet and attract unwanted attention.",
 "Hey Arnold!":"Brian, Jason and Cal pursue a broker.",
 "Island Dreams":"Jason heads out for a diving trip.",
 "Feng Shui":"Jason and Cal take on a furniture-related errand.",
 "Coming Home":"Jason and Lucia reunite and begin putting their plans together.",
 "Buck Me":"Jason and Lucia deal with a bank-related job.",
 "Clear Skies":"Jason and Donnie visit the biker group in Ambrosia.",
 "Swamped":"Jason and Brian encounter the Kingfishers in the wetlands.",
 "Recalibration":"Jason and Lucia spend time with Cal.",
 "What's in the Bag?":"The story moves into the Port Gellhorn chapter.",
 "Ocean Beach":"Jason and Lucia begin establishing their operation in Vice City.",
 "First Impressions":"Jason and Lucia meet Raul Bautista.",
 "Boobie Time":"Jason spends time with Vice City businessman Boobie Ike.",
 "Headliners":"Real Dimez perform at VYB."
 };
 const missionList=$("missionList"),missionDetail=$("missionDetail"),missionSearch=$("missionSearch"),chapterFilter=$("chapterFilter");
 if(missionList&&missionDetail&&missionSearch&&chapterFilter){
  const all=chapters.flatMap(c=>c.items.map((name,i)=>({name,chapter:c.id,chapterName:c.name,number:i+1})));
  const show=m=>{
   missionDetail.innerHTML="<small>CHAPTER "+m.chapter+" / MISSION FILE</small><h3>"+esc(m.name)+"</h3><p><b>"+esc(m.chapterName)+"</b></p><p>"+esc(summaries[m.name]||"This title is listed in the chapter index. A verified step-by-step objective guide is not available in this local entry yet; consult the linked walkthrough sources for detailed objectives.")+"</p><span class='guide-state'>CHAPTER INDEX · STORY SUMMARY</span><div class='mission-reference-links'><a href='https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/' target='_blank' rel='noopener'>POWERPYX WALKTHROUGH ↗</a><a href='https://www.gamesradar.com/games/grand-theft-auto/gta-6-mission-list/' target='_blank' rel='noopener'>GAMESRADAR MISSION LIST ↗</a><a href='https://www.gtabase.com/gta-6/missions/' target='_blank' rel='noopener'>GTABASE DATABASE ↗</a></div>";
   missionList.querySelectorAll(".mission-item").forEach(b=>b.classList.toggle("active",b.dataset.name===m.name));
  };
  const render=()=>{
   const q=missionSearch.value.trim().toLowerCase(),ch=chapterFilter.value;
   const found=all.filter(m=>(ch==="all"||String(m.chapter)===ch)&&m.name.toLowerCase().includes(q));
   missionList.innerHTML=found.length?found.map(m=>'<button type="button" class="mission-item" data-story-mission="'+esc(m.name)+'"><span class="mission-no">'+String(m.number).padStart(2,"0")+'</span><span><span class="mission-name">'+esc(m.name)+'</span><span class="mission-chapter">CHAPTER '+m.chapter+' / '+esc(m.chapterName.toUpperCase())+'</span></span></button>').join(""):"<div class='mission-empty'>No missions match this search.</div>";
  };
  missionList.addEventListener("click",e=>{const b=e.target.closest("[data-story-mission]");if(b){const m=all.find(x=>x.name===b.dataset.storyMission);if(m)show(m);}});
  missionSearch.addEventListener("input",render);chapterFilter.addEventListener("change",render);render();
  if(!missionDetail.querySelector("h3")||missionDetail.textContent.includes("Select a mission"))show(all[0]);
 }
 const characters=[
 ["Jason Duval","MAIN PROTAGONIST","Former Army serviceman","Jason grew up around grifters and crooks. He now works for local drug runners in the Leonida Keys and is looking for a different path.","Lucia Caminos · Brian Heder · Cal Hampton","Dylan Rourke"],
 ["Lucia Caminos","MAIN PROTAGONIST","Recently released from prison","Recently released from Leonida Penitentiary, Lucia is determined to build the life her mother wanted for her. Her partnership with Jason sits at the centre of the story premise.","Jason Duval","Manni L. Perez"],
 ["Cal Hampton","SUPPORTING","Jason's friend","Cal is Jason's friend and an associate of Brian. He feels safest at home, listening to Coast Guard communications and following his own theories.","Jason Duval · Brian Heder","Bobby Moynihan"],
 ["Boobie Ike","SUPPORTING","Vice City businessman","Boobie turned street experience into a legitimate business empire spanning real estate, a strip club and a recording studio. He is partnered with Dre'Quan at Only Raw Records.","Dre'Quan Priest · Only Raw Records","Mike Forbs"],
 ["Dre'Quan Priest","SUPPORTING","Aspiring music mogul","A former street dealer focused on building a career in music. He partners with Boobie and has signed Real Dimez to Only Raw Records.","Boobie Ike · Real Dimez · Only Raw Records","Naiqui Macabroad"],
 ["Real Dimez","DUO / SHARED PROFILE","Rap duo","Bae-Luxe and Roxy are longtime friends who formed a rap duo. After an early hit with local rapper DWNPLY, they are signed to Only Raw Records.","Bae-Luxe · Roxy Rashad · Dre'Quan Priest · DWNPLY","Hood Brat · Krissy Celess"],
 ["Raul Bautista","SUPPORTING","Seasoned bank robber","Raul is confident, charming and cunning. He recruits people willing to take risks for high rewards; his crew members are not individually identified in this profile.","Unnamed robbery crew","Manny Perez"],
 ["Brian Heder","SUPPORTING","Keys drug runner","Brian is a veteran Keys drug runner who moves product through his boat yard. He lets Jason live at one of his rental properties in return for help with local shakedowns.","Jason Duval · Cal Hampton · Lori Heder","Stephen Root"]
 ];
 const charGrid=$("characterGrid"),charSearch=$("characterSearch"),charRole=$("characterRole"),charStatus=$("characterStatus");
 if(charGrid&&charSearch&&charRole&&charStatus){
  const key="vicecitywire-character-review-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(_){}
  const render=()=>{
   const q=charSearch.value.toLowerCase().trim(),r=charRole.value,s=charStatus.value;
   const rows=characters.map((x,i)=>({x,i,done:!!saved[i]})).filter(o=>{
    const [name,tag,type,bio,links,credit]=o.x;
    const roleOK=r==="all"||(r==="protagonist"&&tag==="MAIN PROTAGONIST")||(r==="supporting"&&tag!=="MAIN PROTAGONIST")||(r==="criminal"&&/runner|robber|prison|army/i.test(type+" "+bio))||(r==="music"&&/music|rap|record|businessman/i.test(type+" "+bio));
    return roleOK&&(s==="all"||(s==="reviewed"&&o.done)||(s==="unreviewed"&&!o.done))&&o.x.join(" ").toLowerCase().includes(q);
   });
   charGrid.innerHTML=rows.map(({x,i,done})=>'<article class="character-card"><div class="character-card-top"><span>'+esc(x[1])+'</span><small>CHARACTER DOSSIER</small></div><h3>'+esc(x[0])+'</h3><p>'+esc(x[3])+'</p><div class="character-facts"><div><small>KNOWN CONNECTIONS</small><b>'+esc(x[4])+'</b></div><div><small>PERFORMER CREDIT</small><b>'+esc(x[5])+'</b></div></div><label class="character-review"><input type="checkbox" data-story-review="'+i+'" '+(done?"checked":"")+'><span>MARK PROFILE AS REVIEWED</span></label></article>').join("")||"<div class='db-empty'>No character profiles match this search.</div>";
   const count=$("characterCount"),tracked=$("characterTracked"),fill=$("characterTrackFill");
   if(count)count.textContent=rows.length+" / 8";if(tracked)tracked.textContent=characters.filter((_,i)=>saved[i]).length+" / 8";if(fill)fill.style.width=(characters.filter((_,i)=>saved[i]).length/8*100)+"%";
  };
  charGrid.addEventListener("change",e=>{const c=e.target.closest("[data-story-review]");if(!c)return;saved[c.dataset.storyReview]=c.checked;try{localStorage.setItem(key,JSON.stringify(saved));}catch(_){}render();});
  charSearch.addEventListener("input",render);charRole.addEventListener("change",render);charStatus.addEventListener("change",render);
  $("characterReset")?.addEventListener("click",()=>{saved={};try{localStorage.removeItem(key);}catch(_){}render();});
  render();
 }
 const factions=[
 ["PTT Youngin$","Street gang","Southside, Vice City","Rockstar explicitly describes them as one of Southside Vice City's prominent gangs."],
 ["Final Chapter MC","Outlaw motorcycle club","Ambrosia","A local biker gang is described in Rockstar material; the club name is identified from visual material and community catalogues."],
 ["San4San","Street gang","Vice City · La Perle (reported)","Name appears in game-related material; further classification is attributed to community databases."],
 ["Guardia Brothers","Criminal family","Little Cuba (reported)","Listed as a criminal organisation in community databases; details are not presented as Rockstar-authored lore."],
 ["M7","Street gang","Hamlet (reported)","Community database classification; wider story role and leadership remain unconfirmed here."],
 ["Kolt & Associates","Criminal clan","Port Gellhorn (reported)","Community database classification; do not assume the name describes a conventional corporation."],
 ["Kingfishers","Swamp smuggling gang","Grassrivers (reported)","Listed by community databases as a smuggling group associated with the wetlands."],
 ["La Polilla Negra","Drug cartel","North-west Grassrivers (reported)","Community database classification; operating area is reported rather than an official territory boundary."],
 ["Brian Heder's operation","Drug-running network","Leonida Keys","Rockstar describes Brian as a drug runner moving product through his boat yard."],
 ["Raul Bautista's crew","Bank-robbery crew","Leonida · exact base unstated","Rockstar describes Raul recruiting people for high-risk robberies; individual members are not named here."],
 ["Devil's Dozen","Criminal group","Mission-linked (reported)","Listed in community databases in connection with mission-related contacts."],
 ["Aviators Crew","Local crew","Key Lento (reported)","Community database listing; detailed leadership and territory are not established here."],
 ["Ambrosia County Sheriff","Law enforcement","Ambrosia County","County law-enforcement entry in post-release community databases."],
 ["Ambrosia Police Department","Law enforcement","Ambrosia","Local police entry in post-release community databases."],
 ["Capri Police Department","Law enforcement","Capri","Local police entry in post-release community databases."],
 ["Key Lento Police Department","Law enforcement","Key Lento","Local police entry in post-release community databases."],
 ["Leonard County Sheriff's Office","Law enforcement","Leonard County","County sheriff's office entry in post-release community databases."],
 ["Mariana County Sheriff's Office","Law enforcement","Mariana County","County sheriff's office entry in post-release community databases."],
 ["Leonida Highway Patrol","Law enforcement","Leonida","State highway patrol entry in post-release community databases."],
 ["National Coast Guard","Law enforcement","Leonida coastal waters","Coast Guard entry in post-release community databases."],
 ["Leonida Department of Corrections","Law enforcement","Leonida","Corrections authority entry in post-release community databases."],
 ["Protection of Animals & Controlled Hunting (POACH)","Law enforcement","Leonida wilderness","Wildlife and hunting enforcement entry in post-release community databases."],
 ["Port Gellhorn Police Department","Law enforcement","Port Gellhorn","Local police entry in post-release community databases."],
 ["Vice Beach Police Department","Law enforcement","Vice Beach","Local police entry in post-release community databases."],
 ["Vice City Police Department","Law enforcement","Vice City","City police entry in post-release community databases."],
 ["Vice-Dale Police Department","Law enforcement","Vice-Dale","Local police entry in post-release community databases."],
 ["Waning Sands Police Department","Law enforcement","Waning Sands","City police entry in post-release community databases."]
 ];
 const factionGrid=$("factionGrid"),factionSearch=$("factionSearch"),factionKind=$("factionKind"),factionEvidence=$("factionEvidence"),factionStatus=$("factionStatus");
 if(factionGrid&&factionSearch&&factionKind&&factionEvidence&&factionStatus){
  const evidenceByName={
   "PTT Youngin$":"official","Brian Heder's operation":"official","Raul Bautista's crew":"official",
   "Final Chapter MC":"game","San4San":"game","Ambrosia County Sheriff":"game","Ambrosia Police Department":"game","Capri Police Department":"game","Key Lento Police Department":"game","Leonard County Sheriff's Office":"game","Mariana County Sheriff's Office":"game","Leonida Highway Patrol":"game","National Coast Guard":"game","Leonida Department of Corrections":"game","Protection of Animals & Controlled Hunting (POACH)":"game","Port Gellhorn Police Department":"game","Vice Beach Police Department":"game","Vice City Police Department":"game","Vice-Dale Police Department":"game","Waning Sands Police Department":"game"
  };
  const reviewKey="vicecitywire-faction-review-v1";let reviewed={};try{reviewed=JSON.parse(localStorage.getItem(reviewKey)||"{}")||{};}catch(_){}
  const evidenceLabel={official:"ROCKSTAR-STATED",game:"IN-GAME / VISUAL",community:"COMMUNITY CLASSIFICATION"};
  const render=()=>{
   const q=factionSearch.value.trim().toLowerCase(),k=factionKind.value,e=factionEvidence.value,s=factionStatus.value;
   const rows=factions.map((x,i)=>({x,i,evidence:evidenceByName[x[0]]||"community",done:!!reviewed[i]})).filter(o=>{
    const x=o.x,kindOK=k==="all"||(k==="law"&&x[1]==="Law enforcement")||(k==="gang"&&/gang|club|cartel|family/i.test(x[1]))||(k==="crew"&&/network|crew|group|clan/i.test(x[1]));
    return kindOK&&(e==="all"||o.evidence===e)&&(s==="all"||(s==="reviewed"&&o.done)||(s==="unreviewed"&&!o.done))&&x.join(" ").toLowerCase().includes(q);
   });
   factionGrid.innerHTML=rows.map(o=>{const x=o.x;return '<article class="faction-card"><div class="faction-card-top"><span>'+(x[1]==="Law enforcement"?"LAW ENFORCEMENT":/crew|network|group|clan/i.test(x[1])?"LOCAL CREW":"CRIMINAL GROUP")+'</span><small>'+evidenceLabel[o.evidence]+'</small></div><h3>'+esc(x[0])+'</h3><div class="faction-type">'+esc(x[1])+'</div><div class="faction-area"><small>REPORTED AREA</small><b>'+esc(x[2])+'</b></div><p>'+esc(x[3])+'</p><label class="faction-check"><input type="checkbox" data-story-faction="'+o.i+'" '+(o.done?"checked":"")+'><span>MARK AS REVIEWED</span></label></article>';}).join("")||"<div class='db-empty'>No organisations match these filters.</div>";
   const done=factions.filter((_,i)=>reviewed[i]).length;
   const count=$("factionCount"),tracked=$("factionTracked"),fill=$("factionTrackFill");
   if(count)count.textContent=rows.length+" / "+factions.length;if(tracked)tracked.textContent=done+" / "+factions.length;if(fill)fill.style.width=(done/factions.length*100)+"%";
  };
  factionGrid.addEventListener("change",e=>{const box=e.target.closest("[data-story-faction]");if(!box)return;reviewed[box.dataset.storyFaction]=box.checked;try{localStorage.setItem(reviewKey,JSON.stringify(reviewed));}catch(_){}render();});
  factionSearch.addEventListener("input",render);[factionKind,factionEvidence,factionStatus].forEach(el=>el.addEventListener("change",render));
  $("factionReset")?.addEventListener("click",()=>{reviewed={};try{localStorage.removeItem(reviewKey);}catch(_){}factionSearch.value="";factionKind.value="all";factionEvidence.value="all";factionStatus.value="all";render();});
  render();
 }
 const network=[
 ["Jason Duval","Lucia Caminos","Story partners"],["Jason Duval","Cal Hampton","Friends"],["Cal Hampton","Brian Heder","Associates"],["Jason Duval","Brian Heder","Rents from / works for"],["Brian Heder","Lori Heder","Married"],["Jason Duval","Leonida Keys","Works in"],["Brian Heder","Leonida Keys","Operates in"],["Brian Heder","Brian's boat yard","Moves product through"],["Boobie Ike","Dre'Quan Priest","Business partners"],["Dre'Quan Priest","Only Raw Records","Develops label"],["Boobie Ike","Only Raw Records","Business partnership"],["Real Dimez","Only Raw Records","Signed act"],["DWNPLY","Real Dimez","Early hit collaboration"],["Boobie Ike","Vice City","Business base"],["Raul Bautista","Raul's robbery crew","Recruits for robberies"]
 ];
 const networkDetail=$("networkDetail"),networkCount=$("networkCount"),graph=$("relationshipGraph");
 if(networkDetail&&networkCount&&graph){
  const names=[...new Set(network.flatMap(x=>x.slice(0,2)))];
  const positions=Object.fromEntries(names.map((name,i)=>[name,{x:95+(i%5)*225,y:55+Math.floor(i/5)*115}]));
  const lines=network.map(edge=>{const a=positions[edge[0]],b=positions[edge[1]],mx=(a.x+b.x)/2,my=(a.y+b.y)/2-8;return '<g class="network-edge"><line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'"></line><text x="'+mx+'" y="'+my+'">'+esc(edge[2])+'</text></g>';}).join("");
  const nodeMarkup=names.map(name=>{const p=positions[name];return '<g class="network-node people" data-story-node="'+esc(name)+'" tabindex="0" role="button"><circle cx="'+p.x+'" cy="'+p.y+'" r="28"></circle><text x="'+p.x+'" y="'+(p.y+46)+'">'+esc(name)+'</text></g>';}).join("");
  graph.innerHTML=lines+nodeMarkup;
  networkCount.textContent=names.length+" NODES · "+network.length+" CONNECTIONS";
  const select=name=>{
   const related=network.filter(x=>x[0]===name||x[1]===name).map(x=>({other:x[0]===name?x[1]:x[0],relation:x[2]}));
   networkDetail.innerHTML="<small>CONNECTION DOSSIER</small><h3>"+esc(name)+"</h3><p>Known links recorded in the VICECITYWIRE story relationship index.</p><div class='network-related'><b>KNOWN CONNECTIONS</b>"+related.map(x=>"<div><span>"+esc(x.relation)+"</span><strong>"+esc(x.other)+"</strong></div>").join("")+"</div><span class='network-evidence'>SOURCE STANDARD · OFFICIAL CHARACTER MATERIAL WHERE IDENTIFIED; COMMUNITY LABELS ARE ATTRIBUTED</span>";
   graph.querySelectorAll("[data-story-node]").forEach(n=>n.classList.toggle("selected",n.dataset.storyNode===name));
  };
  graph.addEventListener("click",e=>{const n=e.target.closest("[data-story-node]");if(n)select(n.dataset.storyNode);});
  graph.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){const n=e.target.closest("[data-story-node]");if(n){e.preventDefault();select(n.dataset.storyNode);}}});
  document.querySelectorAll("[data-network-filter]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-network-filter]").forEach(x=>x.classList.toggle("active",x===b));select(b.dataset.networkFilter==="people"?"Jason Duval":b.dataset.networkFilter==="business"?"Only Raw Records":b.dataset.networkFilter==="places"?"Leonida Keys":"Jason Duval");}));
  select("Jason Duval");
 }
})();