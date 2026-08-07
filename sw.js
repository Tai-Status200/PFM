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
  // Only intervene for requests to our own site (HTML/CSS/JS/manifest/icons).
  // Cross-origin requests — most importantly the Apps Script "exec" calls that load booking data — are left completely alone. Letting the service worker touch those adds a wake-up/relay delay for zero benefit since we never want to cache live booking data anyway.
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return; 
  // do not call respondWith — browser handles it natively
  }

  event.respondWith(fetch(event.request));
});
