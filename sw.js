const CACHE_NAME = "resist-tools-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/privacypix/index.html",
  "/assets/global.css",
  "/assets/main.js",
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
