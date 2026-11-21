/* Independent STORY renderer: keeps core story content available even if another module fails. */
(function(){
 "use strict";
 const $=id=>document.getElementById(id);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const chapters=[
 {id:1,name:"Just Like Paradise",items:[
  "Prologue","Gone Fishing","Gear Up","Just A Scratch","Lab Fees","Unwanted Attention","Pipework","Hey Arnold!","Island Dreams","Feng Shui","Coming Home","Buck Me","Clean Up After Donnie","Down To Earth","Clear Skies","Day Release","Swamped","Story Mission 18 (Spoiler Protected)","Recalibration","Tourist Trap","Home Sweet Home","Discharge Time"
 ]},
 {id:2,name:"Paradise Lost",items:[
  "What's in the Bag?","Ambulance Chaser","Just Moved In","Girls' Trip","Moses","Daily Driver","Slam Dunk","Breakfast Run","Coffee Break","Afternoon Delight","Checking Out"
 ]},
 {id:3,name:"Tits Ass Drug Money",items:[
  "Welcome to Vice City","Dealer's Choice","Meet the Heders","Dubious Provenance","Mami Knows Best","South Leonida Real Estate","Tyrone","Here, Kitty Kitty","Car Services","Top Billing","Boobie Time","First Impressions","Caught Slipping","Crosstown Traffic","Credit Check","Steal the Zorrusso for Randy","Sinfrontera National Bank","Security Expert","Ride or Die","Company Property","The Missing Link","Safe Word","Cooties","Bricked Up","Hidden Charges","The Cartel Heist"
 ]},
 {id:4,name:"Vice City, Baby",items:[
  "Ocean Beach","Another Life","Company Cars","Lawyer Up","Party Hard","Heavy Lifting","Photo/Shoot","Making Gainz","Watch It","Cash Injections","Amateur Hour","Dirty Work","Too Much Baggage","Adventures in Babysitting","Fresh Evidence","Power Play","Child's Play","Headliners","Close Surveillance","Delivery Method","Team Building","Fully Catered","VCIA Takedown","Sunset","Story Mission 25 (Spoiler Protected)"
 ]},
 {id:5,name:"Top of the World, Ma",items:[
  "Bird in the Hand","Taking Liberties","VC Baby","Doggie Bag","Operation Savage Glory","Protective Custody","The Finale (Spoiler Protected)"
 ]}
 ];
 const summaries={
  "Prologue":"Lucia meets with her prison counsellor and discusses her release prospects.",
  "Gone Fishing":"Jason and Donnie carry out a smuggling run around the Leonida Keys.",
  "Gear Up":"Jason buys a longarm before heading into the next job.",
  "Just A Scratch":"Jason gets his damaged Ganado repaired.",
  "Lab Fees":"Jason collects rent connected to Brian's operation.",
  "Unwanted Attention":"Jason and Cal travel to Hamlet and attract unwanted attention.",
  "Pipework":"Jason handles a plumbing job for a tenant.",
  "Hey Arnold!":"Brian, Jason and Cal track down a broker.",
  "Island Dreams":"Jason goes diving for a job connected to Kenton.",
  "Feng Shui":"Jason and Cal move furniture.",
  "Coming Home":"Lucia is released and reunites with Jason.",
  "Buck Me":"Jason and Lucia set up a bank account.",
  "Clean Up After Donnie":"Jason retrieves Donnie's dropped package.",
  "Down To Earth":"Jason and Lucia take on a smuggling job.",
  "Clear Skies":"Jason and Donnie visit a biker group.",
  "Day Release":"Mattia, Jason and Lucia spend a night out.",
  "Swamped":"Jason, Brian and Lorrie meet the Kingfishers.",
  "Story Mission 18 (Spoiler Protected)":"This chapter entry is intentionally spoiler-protected. Use the linked chapter walkthrough if you want the full title and objective.",
  "Recalibration":"Jason and Lucia spend time with Cal.",
  "Tourist Trap":"Jason and Lucia take up Mattia's offer for a pickup job.",
  "Home Sweet Home":"Lucia returns to her home base.",
  "Discharge Time":"Lucia checks on Jason.",
  "What's in the Bag?":"Jason and Lucia arrive in Port Gellhorn and begin the next chapter.",
  "Ambulance Chaser":"Lucia deals with an ambulance that needs to be moved.",
  "Just Moved In":"Lucia gets settled and shops for the new place.",
  "Girls' Trip":"Lucia makes a new friend while looking for painkillers.",
  "Moses":"Lucia takes a vehicle to Moses.",
  "Daily Driver":"Lucia steals the Crawler for Moses.",
  "Slam Dunk":"Dunk and Lucia team up while searching for painkillers.",
  "Breakfast Run":"Jason and Lucia go for waffles.",
  "Coffee Break":"Jason and Lucia take a break and make plans.",
  "Afternoon Delight":"Jason and Lucia visit a strip club and deal with Vicki's boss.",
  "Checking Out":"Jason and Lucia prepare to move on to Vice City.",
  "Welcome to Vice City":"Jason and Lucia meet Dre'Quan and enter Vice City's music scene.",
  "Dealer's Choice":"Jason handles a drug deal.",
  "Meet the Heders":"Jason and Lucia spend time with Brian and Lori Heder.",
  "Dubious Provenance":"Jason and Lucia visit an antique store.",
  "Mami Knows Best":"Lucia reconnects with a member of her family.",
  "South Leonida Real Estate":"Lucia has a run-in with M7.",
  "Tyrone":"Jason asks Tyrone for work.",
  "Here, Kitty Kitty":"Jason looks for Charles.",
  "Car Services":"Lucia steals another vehicle.",
  "Top Billing":"Jason, Lucia and Dre'Quan attend a Real Dimez performance.",
  "Boobie Time":"Jason drives Boobie Ike around Vice City.",
  "First Impressions":"Jason and Lucia meet Raul Bautista.",
  "Caught Slipping":"Jason and Lucia intervene in a burglary.",
  "Crosstown Traffic":"Lucia tails a gang member.",
  "Credit Check":"Raul invites Jason and Lucia to his base and introduces the next stage of the work.",
  "Steal the Zorrusso for Randy":"Jason and Lucia steal a high-end car for Randy.",
  "Sinfrontera National Bank":"Jason and Lucia prepare the Cartel Heist.",
  "Security Expert":"Jason and Lucia meet Nicole and arrange security expertise for the heist.",
  "Ride or Die":"Jason helps Dre'Quan with a problem.",
  "Company Property":"Jason and Lucia deal with a weapons shipment.",
  "The Missing Link":"Lucia follows a lead connected to a cockfight.",
  "Safe Word":"Lucia learns a new skill needed for the operation.",
  "Cooties":"Lucia takes part in a music-video shoot.",
  "Bricked Up":"Jason and Lucia do work for Boobie.",
  "Hidden Charges":"Jason and Lucia prepare the explosives for the bank job.",
  "The Cartel Heist":"Jason and Lucia carry out the bank heist.",
  "Ocean Beach":"Jason and Lucia establish their operation in Vice City.",
  "Another Life":"Lucia reflects on her past.",
  "Company Cars":"Jason and Lucia arrange new vehicles.",
  "Lawyer Up":"Jason and Lucia meet their lawyer, Abe Gonzalez.",
  "Party Hard":"Jason and Lucia work personal security for a celebrity.",
  "Heavy Lifting":"Jason and Lucia deliver a hard drive to Raul.",
  "Photo/Shoot":"Jason, Lucia and Dre'Quan shoot a promotional video.",
  "Making Gainz":"Lucia gets to know someone connected to the VCIA operation.",
  "Watch It":"Jason and Dre'Quan meet a club owner.",
  "Cash Injections":"Lucia helps an associate named Nate.",
  "Amateur Hour":"Lucia helps Cisco confront a director.",
  "Dirty Work":"Lucia and Jason make new inroads while dealing with Raina.",
  "Too Much Baggage":"Jason scopes out airport baggage handling for the VCIA operation.",
  "Adventures in Babysitting":"Jason works nightclub security for Andrés.",
  "Fresh Evidence":"Jason and Dre'Quan steal blackmail material.",
  "Power Play":"Jason gathers intelligence for the VCIA plan.",
  "Child's Play":"Jason and Lucia help an acquaintance rescue Rafa.",
  "Headliners":"Real Dimez perform at VYB during the launch party.",
  "Close Surveillance":"Jason uses a spy drone to watch the bodybuilders.",
  "Delivery Method":"Jason goes undercover to help Andrea.",
  "Team Building":"Lucia proves herself to Kordell's crew.",
  "Fully Catered":"Jason and Lucia steal a catering truck.",
  "VCIA Takedown":"Jason and Lucia begin the airport heist.",
  "Sunset":"Jason and Lucia look for answers.",
  "Story Mission 25 (Spoiler Protected)":"This chapter entry is intentionally spoiler-protected. Use the linked chapter walkthrough if you want the full title and objective.",
  "Bird in the Hand":"Jason and Lucia boost a vehicle as the next plan takes shape.",
  "Taking Liberties":"Jason and Lucia work through a new plan.",
  "VC Baby":"Someone asks Jason and Lucia for help.",
  "Doggie Bag":"Jason and Lucia hunt for contraband.",
  "Operation Savage Glory":"Jason and Lucia recover a shipment.",
  "Protective Custody":"Jason and Lucia work together on a protection job.",
  "The Finale (Spoiler Protected)":"The final story mission. Its title and outcome are withheld here to reduce spoilers."
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
 ["Jason Duval","MAIN PROTAGONIST","Criminal world","Playable protagonist. A former Army serviceman who works for local drug runners in the Leonida Keys and is trying to find a more stable path.","Lucia Caminos · Brian Heder · Cal Hampton","Dylan Rourke"],
 ["Lucia Caminos","MAIN PROTAGONIST","Criminal world","Playable protagonist. Recently released from Leonida Penitentiary, Lucia is determined to build the life her mother wanted for her.","Jason Duval · Mia Caminos","Manni L. Perez"],
 ["Cal Hampton","OFFICIAL PROFILE","Criminal world","Jason's best friend and an associate of Brian. He spends much of his time at home listening to Coast Guard communications and following his own theories.","Jason Duval · Brian Heder","Bobby Moynihan"],
 ["Boobie Ike","OFFICIAL PROFILE","Music / business","Vice City businessman with interests in real estate, the Jack of Hearts and a recording studio. He runs Only Raw Records with Dre'Quan Priest.","Dre'Quan Priest · Bae-Luxe · Roxy · Only Raw Records","Mike Forbs"],
 ["Dre'Quan Priest","OFFICIAL PROFILE","Music industry","Former street dealer focused on building a career in music. He partners with Boobie and signed Real Dimez to Only Raw Records.","Boobie Ike · Bae-Luxe · Roxy · DWNPLY","Naiqui Macabroad"],
 ["Raul Bautista","OFFICIAL PROFILE","Criminal world","A seasoned bank robber who recruits people willing to take risks for high rewards. His crew's individual membership is not fully identified here.","Jason Duval · Lucia Caminos · robbery crew","Manny Perez"],
 ["Brian Heder","OFFICIAL PROFILE","Criminal world","Veteran Keys drug runner who moves product through Brian's Boat Works & Marina and rents Jason a property in exchange for local work.","Jason Duval · Cal Hampton · Lori Heder · Mandy","Stephen Root"],
 ["Bae-Luxe","OFFICIAL PROFILE / REAL DIMEZ","Music industry","One half of Real Dimez. Bae-Luxe and Roxy were friends since high school and built an audience through music and social media before signing to Only Raw Records.","Roxy · Dre'Quan Priest · Boobie Ike · DWNPLY","Hood Brat"],
 ["Roxy","OFFICIAL PROFILE / REAL DIMEZ","Music industry","The other half of Real Dimez. An early hit with local rapper DWNPLY helped the duo gain attention before signing with Only Raw Records.","Bae-Luxe · Dre'Quan Priest · Boobie Ike · DWNPLY","Krissy Celess"],
 ["Andrés de León","SUPPORTING CHARACTER","Entertainment / business","The client at the centre of the Megamundo security job. Val hires Jason and Lucia to protect him during a high-profile party.","Val · Petra Navarro · Jason Duval · Lucia Caminos","J. Eddie Martinez"],
 ["Billy","SUPPORTING CHARACTER","Strangers & Freaks","Connected to the Thrillbillies Mud Club. His optional questline centres on mud-bogging and off-road jobs.","Thrillbillies · Jason Duval","Spenser Granese"],
 ["Bret Vogel","SUPPORTING CHARACTER","Hunting / outdoors","Runs a hunting business near Mount Kalaga. His questline introduces hunting and the 15 Target Decks.","Jason Duval · Mount Kalaga National Park","Jariko Denman"],
 ["DWNPLY","SUPPORTING CHARACTER","Music industry","Local rapper whose earlier hit with Real Dimez helped launch the duo's profile. Further biography details are limited in published material.","Bae-Luxe · Roxy · Dre'Quan Priest","Denzel Curry"],
 ["Kirk","SUPPORTING CHARACTER","Strangers & Freaks","Eccentric hunter connected to the Skunk Ape and tree-effigy investigations around Pelican Valley. Some quest steps are character-specific.","Jason Duval · Lucia Caminos · Pelican Valley","Not listed in the profile source"],
 ["Kyle","SUPPORTING CHARACTER","Strangers & Freaks","Crop-duster pilot operating from McKittrick Farm near the Starlet Motel. His optional questline begins with a pilot-job lead.","McKittrick Farm · Billy","Not listed in the profile source"],
 ["Lori Heder","SUPPORTING CHARACTER","Criminal world","Brian Heder's third and current wife, associated with the Heder boat yard in the Leonida Keys.","Brian Heder · Jason Duval","Orlagh Cassidy"],
 ["Mandy","SUPPORTING CHARACTER","Leonida Keys resident","One of Brian Heder's tenants in the Keys. She appears in Jason's early story and is connected to his local life.","Brian Heder · Jason Duval","Not listed in the profile source"],
 ["Moses Watkins","SUPPORTING CHARACTER","Vehicle services","Port Gellhorn mechanic, known as Mo, who buys untracked vehicles. He also registers cars for the Scooter Bros app.","Lucia Caminos · Port Gellhorn · Scooter Bros","Aaron Morton"],
 ["Petra Navarro","SUPPORTING CHARACTER","Business / entertainment","Chief operating officer of Megamundo. She appears during the party assignment involving Andrés de León.","Andrés de León · Val · Megamundo","Elaine Del Valle"],
 ["Phil","SUPPORTING CHARACTER","Retail / weapons","Owner of Phil's Ammu-Nation. A television advertisement in Rockstar footage promotes his gun store.","Phil's Ammu-Nation · Vice City","Not listed in the profile source"],
 ["Shirley","SUPPORTING CHARACTER","Leonida Keys resident","Jason's neighbour in Key Lento. Her small Chapter 1 errands are reported as missable side tasks.","Jason Duval · Key Lento","Not listed in the profile source"],
 ["Stefanie","SUPPORTING CHARACTER","Law enforcement / corrections","Social worker with the Leonida Department of Corrections who interviews Lucia while she is incarcerated.","Lucia Caminos · Leonida Penitentiary","Not listed in the profile source"],
 ["Val","SUPPORTING CHARACTER","Entertainment / security","Jason and Lucia's contact for the Megamundo security assignment. She introduces them to the client and other guests.","Andrés de León · Petra Navarro · Jason Duval · Lucia Caminos","Josephine Phoenix"],
 ["Wyman","SUPPORTING CHARACTER","Vehicle collector","Collector and fixer associated with the Ultimate Edition Classic Car Collection commission and vehicle restoration requests.","Classic Car Collection · Jason Duval","David Stishan"],
 ["Erin Henshaw","MENTIONED · OFFICIAL SIGHTING","Politics","Name appears on campaign signs in an official Ambrosia screenshot. The material identifies a mayoral candidate but gives little further detail.","Ambrosia · local campaign signs","Not stated"],
 ["Kenny Brewster","MENTIONED · OFFICIAL SIGHTING","Music reference","Name printed on a vintage-style shirt worn by Brian Heder in an official screenshot. Rockstar has not supplied a biography for the name.","Brian Heder · shirt graphic","Not stated"],
 ["Rudi","MENTIONED · OFFICIAL SIGHTING","In-world social media","Named in an in-world viral clip and memorial-style post from Trailer 1. Whether he appears beyond that clip is not established in the source entry.","Trailer 1 · in-world social post","Not stated"],
 ["Yung Ancestor","MENTIONED · UNCONFIRMED LINK","GTA Online reference","A logo resembling the GTA Online character's branding was spotted on a pedestrian's shirt. Rockstar has not confirmed this as a GTA VI character appearance.","GTA Online reference · clothing logo","Not confirmed"]
 ];
 const charGrid=$("characterGrid"),charSearch=$("characterSearch"),charRole=$("characterRole"),charStatus=$("characterStatus");
 if(charGrid&&charSearch&&charRole&&charStatus){
  const key="vicecitywire-character-review-v2";let saved={};try{const current=localStorage.getItem(key);if(current)saved=JSON.parse(current)||{};else{const legacy=JSON.parse(localStorage.getItem("vicecitywire-character-review-v1")||"{}")||{};saved={0:!!legacy[0],1:!!legacy[1],2:!!legacy[2],3:!!legacy[3],4:!!legacy[4],5:!!legacy[6],6:!!legacy[7],7:!!legacy[5],8:!!legacy[5]};if(Object.values(saved).some(Boolean))localStorage.setItem(key,JSON.stringify(saved));}}catch(_){}
  const render=()=>{
   const q=charSearch.value.toLowerCase().trim(),r=charRole.value,s=charStatus.value;
   const rows=characters.map((x,i)=>({x,i,done:!!saved[i]})).filter(o=>{
    const [name,tag,type,bio,links,credit]=o.x;
    const roleOK=r==="all"||(r==="protagonist"&&tag==="MAIN PROTAGONIST")||(r==="supporting"&&tag!=="MAIN PROTAGONIST")||(r==="criminal"&&/runner|robber|prison|army/i.test(type+" "+bio))||(r==="music"&&/music|rap|record|businessman/i.test(type+" "+bio));
    return roleOK&&(s==="all"||(s==="reviewed"&&o.done)||(s==="unreviewed"&&!o.done))&&o.x.join(" ").toLowerCase().includes(q);
   });
   charGrid.innerHTML=rows.map(({x,i,done})=>'<article class="character-card"><div class="character-card-top"><span>'+esc(x[1])+'</span><small>CHARACTER DOSSIER</small></div><h3>'+esc(x[0])+'</h3><p>'+esc(x[3])+'</p><div class="character-facts"><div><small>KNOWN CONNECTIONS</small><b>'+esc(x[4])+'</b></div><div><small>PERFORMER / CREDIT NOTE</small><b>'+esc(x[5])+'</b></div></div><label class="character-review"><input type="checkbox" data-story-review="'+i+'" '+(done?"checked":"")+'><span>MARK PROFILE AS REVIEWED</span></label></article>').join("")||"<div class='db-empty'>No character profiles match this search.</div>";
   const count=$("characterCount"),tracked=$("characterTracked"),fill=$("characterTrackFill");
   if(count)count.textContent=rows.length+" / 28";if(tracked)tracked.textContent=characters.filter((_,i)=>saved[i]).length+" / 28";if(fill)fill.style.width=(characters.filter((_,i)=>saved[i]).length/28*100)+"%";
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
 ["Jason Duval","Lucia Caminos","Story partners"],
 ["Jason Duval","Cal Hampton","Friends"],
 ["Cal Hampton","Brian Heder","Associates"],
 ["Jason Duval","Brian Heder","Rents from / works for"],
 ["Brian Heder","Lori Heder","Married"],
 ["Jason Duval","Leonida Keys","Works in"],
 ["Brian Heder","Leonida Keys","Operates in"],
 ["Brian Heder","Brian's Boat Works & Marina","Moves product through"],
 ["Boobie Ike","Dre'Quan Priest","Business partners"],
 ["Dre'Quan Priest","Only Raw Records","Runs label"],
 ["Boobie Ike","Only Raw Records","Business partnership"],
 ["Bae-Luxe","Only Raw Records","Signed act"],
 ["Roxy","Only Raw Records","Signed act"],
 ["Bae-Luxe","Roxy","Rap duo / longtime friends"],
 ["DWNPLY","Bae-Luxe","Early hit collaboration"],
 ["DWNPLY","Roxy","Early hit collaboration"],
 ["Raul Bautista","Raul's robbery crew","Recruits for robberies"],
 ["Andrés de León","Val","Client / security contact"],
 ["Andrés de León","Petra Navarro","Megamundo colleagues"],
 ["Petra Navarro","Megamundo","Chief operating officer"],
 ["Val","Jason Duval","Hires for security assignment"],
 ["Val","Lucia Caminos","Hires for security assignment"],
 ["Billy","Thrillbilly Mud Club","Questline / off-road club"],
 ["Bret Vogel","Mount Kalaga National Park","Hunting business / region"],
 ["Kirk","Pelican Valley","Skunk Ape quest area"],
 ["Kyle","McKittrick Farm","Crop-duster base"],
 ["Lori Heder","Brian Heder","Married"],
 ["Mandy","Brian Heder","Tenant at his property"],
 ["Moses Watkins","Port Gellhorn","Mechanic / vehicle buyer"],
 ["Phil","Phil's Ammu-Nation","Store owner"],
 ["Shirley","Jason Duval","Neighbour in Key Lento"],
 ["Stefanie","Lucia Caminos","Prison social worker"],
 ["Wyman","Classic Car Collection","Vehicle collection commission"],
 ["Erin Henshaw","Ambrosia","Mayoral candidate on campaign signs"]
 ];
 const networkDetail=$("networkDetail"),networkCount=$("networkCount"),graph=$("relationshipGraph");
 if(networkDetail&&networkCount&&graph){
  const names=[...new Set(network.flatMap(x=>x.slice(0,2)))];
  const businessNames=new Set(["Only Raw Records","Brian's Boat Works & Marina","Megamundo","Thrillbilly Mud Club","Phil's Ammu-Nation","Classic Car Collection"]);
  const placeNames=new Set(["Leonida Keys","Mount Kalaga National Park","Pelican Valley","McKittrick Farm","Port Gellhorn","Ambrosia","Key Lento","Vice City"]);
  const nodeType=name=>businessNames.has(name)?"business":placeNames.has(name)?"places":"people";
  const positions=Object.fromEntries(names.map((name,i)=>[name,{x:95+(i%5)*225,y:55+Math.floor(i/5)*115}]));
  const lines=network.map(edge=>{const a=positions[edge[0]],b=positions[edge[1]],mx=(a.x+b.x)/2,my=(a.y+b.y)/2-8;return '<g class="network-edge"><line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'"></line><text x="'+mx+'" y="'+my+'">'+esc(edge[2])+'</text></g>';}).join("");
  const nodeMarkup=names.map(name=>{const p=positions[name];return '<g class="network-node '+nodeType(name)+'" data-story-node="'+esc(name)+'" tabindex="0" role="button"><circle cx="'+p.x+'" cy="'+p.y+'" r="28"></circle><text x="'+p.x+'" y="'+(p.y+46)+'">'+esc(name)+'</text></g>';}).join("");
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