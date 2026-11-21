/* VICECITYWIRE PWA install and connectivity controller */
(function(){
 const installButton=document.getElementById("installAppButton");
 let installPrompt=null;
 if(installButton){
  window.addEventListener("beforeinstallprompt",event=>{
   event.preventDefault();
   installPrompt=event;
   installButton.hidden=false;
  });
  installButton.addEventListener("click",async()=>{
   if(!installPrompt)return;
   installButton.disabled=true;
   installPrompt.prompt();
   await installPrompt.userChoice;
   installPrompt=null;
   installButton.hidden=true;
   installButton.disabled=false;
  });
  window.addEventListener("appinstalled",()=>{
   installPrompt=null;
   installButton.hidden=true;
   installButton.disabled=false;
  });
  const standalone=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true;
  if(standalone)installButton.hidden=true;
 }
 if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){
  window.addEventListener("load",()=>{
   navigator.serviceWorker.register("./sw.js").then(registration=>{
    registration.update().catch(()=>{});
   }).catch(error=>console.warn("VICECITYWIRE offline support unavailable:",error));
  });
 }
})();
