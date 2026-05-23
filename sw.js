const CACHE_NAME = "thebigkorea-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./vehicle.html",
  "./vehicle.css",
  "./vehicle.js",
  "./vehicle-admin.html",
  "./vehicle-admin.css",
  "./vehicle-admin.js",
  "./trip.html",
  "./trip.css",
  "./trip.js",
  "./trip-admin.html",
  "./trip-admin.css",
  "./trip-admin.js"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});