/* VICECITYWIRE — GTA VI cheat database
   Research snapshot: 21 Nov 2026. Reported sequences are cross-referenced, not Rockstar-confirmed. */
(function initCheatDatabase(){
 const root=document.getElementById("cheats"),list=document.getElementById("cheatList");
 if(!root||!list)return;
 const entries=[
 ["Player","$250,000","Adds $250,000 to cash.","Finish the main story.","↑ → ↓ ← ↑ ← ↓ →"],
 ["Player","Drunk","Makes the protagonists drunk.","Spend $2,500 on alcohol.","↑ ← → ↑ ↑ ← → ↑ ← →"],
 ["Player","Raise Heat Level","Raises the wider Heat level.","Lose a 3-star Wanted level 25 times.","← ↓ → ↓ ↑ ↓ ↑"],
 ["Player","Raise Wanted Level","Raises the immediate Wanted level.","Lose a 3-star Wanted level 50 times.","← ↓ → ↓ ↑ → ↑"],
 ["Player","Unlimited Focus","Focus never runs out.","Finish the main story.","↓ ↑ ↑ ↓ ↑ ↓ ↑ ↓ ↑ →"],
 ["Player","No Fall Damage","Prevents damage from falls.","Survive a 40-foot freefall 20 times.",""],
 ["Player","Parachute","Adds a parachute.","Complete 50 skydives or BASE jumps from 300 feet or higher.",""],
 ["Player","Body Armor","Adds body armor.","Complete 100 workouts.","↓ ↑ ← ↑ ↑ ↑ ↑ ↑ ↓ ↓"],
 ["Player","Repair Vehicle","Repairs the current vehicle.","Win 10 races at Gellhorn Raceway, Thrillbilly Mud Club and Boone Speedway.",""],
 ["Player","Unlimited Nitrous","Nitrous and fuel never run out.","Complete 50 stunt jumps.",""],
 ["Combat","Max Ammo","Fills all ammunition.","Win 25 bronze medals or better at shooting ranges. One guide reports 20; most sources report 25.","↓ ↑ → ↓ ← ← ↑ ↑ ↓ ←"],
 ["Combat","Infinite Ammo","Ammunition never runs out.","Win 25 silver medals or better at shooting ranges.","↓ ↑ → ↓ ← ← ↑ ↓ ↓ ↓","disputed"],
 ["Combat","No Reload","Infinite ammunition without reloading.","Win 25 gold medals at shooting ranges.","↓ ↑ → ↓ ← ← ↑ ↓ ↓ ↑","disputed"],
 ["Combat","All Explosive Weapons","Unlocks explosive weapons with full ammunition.","Throw 100 grenades.",""],
 ["Combat","Incendiary Ammo","Ammunition sets targets on fire.","Burn 100 enemies with fire damage.",""],
 ["Combat","Exploding Bottles","Bottles explode on impact.","Throw 100 Molotovs.",""],
 ["Combat","Explosive Shotgun","Gives the Mason & Keen Shortstraw explosive shells.","Hit 100 enemies with explosive damage.",""],
 ["Combat","Hauners H-AT","Adds a Hauners H-AT launcher.","Blow up 100 vehicles.",""],
 ["Combat","Attack Force","Shots and punches launch targets.","Finish the main story.","↓ ↑ ← ← → ↓ ↓ ↑ ↓"],
 ["Combat","Exploding Balls","Sports balls explode on impact.","Hit 20 enemies with explosive damage.","↓ ↑ ← ← → ↓ ↓ ↑ →"],
 ["Combat","Vehicle Force","Vehicle impacts launch targets.","Kill 25 enemies with a vehicle.","↓ ↑ ← ← → ↓ ← ↑ ↓"],
 ["Vehicles","Interstate Ambulance","Spawns an Interstate Ambulance.","Discover it in the Progress menu.",""],
 ["Vehicles","Airboat 09","Spawns an Airboat 09.","Complete 5 survival challenges.",""],
 ["Vehicles","Bravado Banshee","Spawns a Bravado Banshee.","Complete all combat challenges.",""],
 ["Vehicles","Tuff BMX","Spawns a Tuff BMX.","Complete 5 fitness challenges.",""],
 ["Vehicles","Maibatsu Boomazoom","Spawns a Maibatsu Boomazoom.","Complete 5 shopping challenges.","← ↑ → ↓ ← ← ↑ ←"],
 ["Vehicles","Nagasaki Carbon RS","Spawns a Nagasaki Carbon RS.","Complete all exploration challenges.",""],
 ["Vehicles","'65 Vapid Dominator","Spawns a '65 Vapid Dominator.","Complete all fitness challenges.",""],
 ["Vehicles","Progen Emerus","Spawns a Progen Emerus.","Complete all vehicle challenges.",""],
 ["Vehicles","Inflatable Flamingo","Spawns an inflatable flamingo.","Destroy 50 cocaine flamingos.",""],
 ["Vehicles","MTL Pumper","Spawns an MTL Pumper fire truck.","Discover it in the Progress menu.","← ↑ → ↓ ← → → ↑","disputed"],
 ["Vehicles","Vapid Stainer G2 Taxi","Spawns a Vapid Stainer G2 Taxi.","Complete 5 sports challenges.",""],
 ["Vehicles","Hauners P-996 Lazer","Spawns a Hauners P-996 Lazer jet.","Complete all challenges.",""],
 ["Vehicles","HVY Bulldozer","Spawns an HVY Bulldozer.","Discover it in the Progress menu.","← ↑ → ↓ ← → → ↓","disputed"],
 ["Vehicles","Lapwing Mallard","Spawns a Lapwing Mallard.","Complete 5 vehicle challenges.",""],
 ["Vehicles","Brimstone Golfer","Spawns a Brimstone Golfer.","Complete all sports challenges.",""],
 ["Vehicles","Hauners Rhino Tank","Spawns a Hauners Rhino Tank.","Complete all survival challenges.",""],
 ["Vehicles","Maibatsu Sanchez","Spawns a Maibatsu Sanchez.","Complete 5 criminal challenges.",""],
 ["Vehicles","Nagasaki Sea Sparrow","Spawns a Nagasaki Sea Sparrow.","Complete 5 exploration challenges.",""],
 ["Vehicles","Speeder 700 GT","Spawns a Speeder 700 GT.","Complete 5 combat challenges.",""],
 ["Vehicles","Truffade Thrax","Spawns a Truffade Thrax.","Complete all shopping challenges.",""],
 ["Vehicles","Western Zombie Bobber","Spawns a Western Zombie Bobber.","Complete all criminal challenges.",""],
 ["Environment","Move Time Forward","Moves the in-game clock forward.","Find 10 collectible watches.",""],
 ["Environment","Pause Time of Day","Stops the in-game clock.","Find 20 collectible watches.",""],
 ["Environment","Cycle Weather","Changes the weather.","Reveal the entire map. Some guides instead say finish the story.","↓ → ↑ ↓ → ↑ →"],
 ["Screen filters","Golden Hour","Applies a golden, widescreen visual look.","Spend 4 hours holding hands.",""],
 ["Screen filters","Powdered Sugar","Applies a bright white world effect with sparkles.","Scan all space debris with WAiNK.",""],
 ["Screen filters","Pinhole","Applies a pinhole-camera look.","Clear 25 gang operations with your partner.",""],
 ["Screen filters","Neon Jungle","Applies neon highlights.","Discover all 16 Girlypop vehicles.",""],
 ["Screen filters","Yesteryear","Applies a black-and-white CRT television look.","Discover the Ridgway.",""],
 ["Screen filters","Cataclysm","Adds murky smoke over the world.","Discover Martha's Vamos in the Progress menu.","↓ ↓ ↑ → → ↑ ← ← → →"],
 ["Screen filters","Videotape","Applies a videotape visual look.","Complete 50 activities with your partner.",""],
 ["Screen filters","Dark Mirror","Flips the world upside down and darkens it.","Make $500,000 selling vehicles.",""],
 ["Screen filters","Migraine","Applies a blurred, distorted view.","Survive 6 minutes at a 6-star Wanted level.",""],
 ["Screen filters","Dollhouse","Applies vivid colours and a narrow frame.","Spend 8 hours with your partner.","↓ ↓ ↑ → → ↑ ← ← ↓ →"],
 ["Screen filters","Bubblegum","Applies a purple-and-yellow world effect with sparkles.","Find all 24 Vice City Flamingos cards.",""],
 ["Screen filters","Fast Forward","Applies motion blur and fast-moving clouds.","Complete 50 meditations.",""],
 ["Screen filters","Fisheye","Applies a fisheye-lens effect.","Catch 100 fish.",""],
 ["Screen filters","Faded Glory","Applies a colour CRT television look.","Rob 50 stores with your partner.","↓ ↓ ↑ → → ↑ ← ← ← →"],
 ["Screen filters","Pixel Art","Applies a pixelated visual look.","Make $250,000 selling collectibles.",""],
 ["Screen filters","Hellscape","Applies a red-and-orange world effect with heat haze.","Steal 100 police vehicles.",""]
 ];
 const storageKey="vcw_gta6_cheats_unlocked_v1";
 let unlocked=new Set();try{unlocked=new Set(JSON.parse(localStorage.getItem(storageKey)||"[]"));}catch(e){}
 const $=id=>document.getElementById(id),search=$("cheatSearch"),category=$("cheatCategory"),codeFilter=$("cheatCodeFilter");
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase(),cat=category.value,filter=codeFilter.value;
  const rows=entries.filter(x=>(cat==="all"||x[0]===cat)&&(!q||x.slice(0,4).join(" ").toLowerCase().includes(q))&&(filter==="all"||(filter==="code"&&!!x[4])||(filter==="missing"&&!x[4])||(filter==="unlocked"&&unlocked.has(x[1]))));
  $("cheatCount").textContent=rows.length+" / 61 CHEATS";
  $("cheatUnlockedCount").textContent=unlocked.size+" UNLOCKED";
  $("cheatKnownCount").textContent=entries.filter(x=>x[4]).length+" CODES REPORTED";
  list.innerHTML=rows.map(x=>{
   const [cat,name,effect,unlock,code,flag]=x,has=!!code,done=unlocked.has(name);
   const status=has?(flag==="disputed"?"REPORTED · SOURCES DISAGREE":"REPORTED · MULTIPLE GUIDES"):"CODE NOT PUBLISHED";
   return '<article class="cheat-card'+(done?' is-unlocked':'')+'"><div class="cheat-card-head"><span class="cheat-category">'+esc(cat.toUpperCase())+'</span><span class="cheat-evidence '+(has?'reported':'pending')+'">'+status+'</span></div><div class="cheat-card-main"><div class="cheat-card-info"><h3>'+esc(name)+'</h3><p>'+esc(effect)+'</p><div class="cheat-unlock"><small>UNLOCK REQUIREMENT</small><span>'+esc(unlock)+'</span></div></div><div class="cheat-code-area">'+(has?'<small>PS5 / XBOX D-PAD SEQUENCE</small><div class="cheat-code">'+esc(code)+'</div><button type="button" class="cheat-copy" data-copy="'+esc(code)+'">COPY SEQUENCE</button>':'<small>ACTIVATION SEQUENCE</small><div class="cheat-code missing-code">Not published yet</div>')+'</div></div><label class="cheat-unlocked-check"><input type="checkbox" data-unlocked="'+esc(name)+'" '+(done?'checked':'')+'> MARK AS UNLOCKED IN MY GAME</label></article>';
  }).join("")||'<p class="cheat-empty">No cheats match your search. Try another term or category.</p>';
  list.querySelectorAll("[data-unlocked]").forEach(input=>input.addEventListener("change",()=>{input.checked?unlocked.add(input.dataset.unlocked):unlocked.delete(input.dataset.unlocked);try{localStorage.setItem(storageKey,JSON.stringify([...unlocked]));}catch(e){}render();}));
  list.querySelectorAll("[data-copy]").forEach(button=>button.addEventListener("click",async()=>{const value=button.dataset.copy;try{await navigator.clipboard.writeText(value);button.textContent="COPIED";}catch(e){button.textContent="SELECT TO COPY";const range=document.createRange();const node=button.previousElementSibling;if(node){range.selectNodeContents(node);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);}}}));
 }
 [search,category,codeFilter].forEach(el=>el.addEventListener(el===search?"input":"change",render));
 render();
})();