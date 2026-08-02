// Minimal service worker — intentionally does NOT cache anything.
// Its only job is to exist and register, which is what Android's Chrome
// requires before it will show the "Install app" prompt. Booking data is
// always live and should never be served from a cache.

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // Pass every request straight through to the network — no caching.
  event.respondWith(fetch(event.request));
});
