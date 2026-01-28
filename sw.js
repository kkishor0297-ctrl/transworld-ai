self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("tw-ai").then(c=>c.addAll(["./"]))
  );
});
