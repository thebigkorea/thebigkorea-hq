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

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});