const CACHE_NAME = "vicecitywire-shell-v4";
const APP_SHELL = [
 "./", "./index.html",
 "./styles.css", "./script.js",
 "./story-content.js", "./quality-pass.js", "./cheats.js", "./pwa.js",
 "./manifest.webmanifest", "./icon.svg", "./icon-192.svg", "./icon-512.svg",
 "./styles.css?v=cheats-chevron-20261121-1",
 "./script.js?v=world-discover-fix-20261121-1",
 "./story-content.js?v=story-content-20261121-5",
 "./quality-pass.js?v=content-audit-20261121-5",
 "./cheats.js?v=cheats-20261121-1",
 "./pwa.js?v=pwa-setup-20261121-1"
];
self.addEventListener("install", event => {
 event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
 event.waitUntil(caches.keys().then(keys => Promise.all(
  keys.filter(key => key.startsWith("vicecitywire-shell-") && key !== CACHE_NAME).map(key => caches.delete(key))
 )).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
 const request=event.request;
 if(request.method!=="GET")return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(fetch(request).then(response=>{
  if(response&&response.ok){
   const copy=response.clone();
   caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));
  }
  return response;
 }).catch(async()=>{
  const exact=await caches.match(request);
  if(exact)return exact;
  const withoutQuery=await caches.match(request,{ignoreSearch:true});
  if(withoutQuery)return withoutQuery;
  if(request.mode==="navigate")return (await caches.match("./index.html"))||Response.error();
  return Response.error();
 }));
});
