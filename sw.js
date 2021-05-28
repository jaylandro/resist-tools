const CACHE_NAME = "resist-tools-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/obscurecam/index.html",
  "/assets/global.css",
  "/assets/main.js",
  "/obscurecam/js/tracking-min.js",
  "/obscurecam/js/face-min.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", () => null);
