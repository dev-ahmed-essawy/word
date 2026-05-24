const CACHE_NAME = 'word-duel-v1';
const urlsToCache = [ './', 'index.html' ];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Caching assets individually so one missing file won't abort installation
      return Promise.allSettled(
        urlsToCache.map(url => {
          return cache.add(url).catch(err => {
            console.warn(`Failed to cache PWA asset: ${url}`, err);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
