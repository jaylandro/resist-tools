const CACHE_NAME = "resist-tools-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/global.css",
  "/assets/main.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", () => null);
