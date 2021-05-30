const CACHE_NAME = "resist-tools-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/global.css",
  "/assets/main.js",
  "/sharelocation/",
  "/sharelocation/index.html",
  "/sharelocation/js/sharelocation.js",
  "/privacypix/",
  "/privacypix/index.html",
  "/privacypix/js/tracking-min.js",
  "/privacypix/js/face-min.js",
  "/privacypix/js/privacypix.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", () => null);
