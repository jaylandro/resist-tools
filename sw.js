const CACHE_NAME = "resist-tools-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/global.css",
  "/assets/main.js",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
