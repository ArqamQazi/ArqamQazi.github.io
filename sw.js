const CACHE_NAME = 'masjid-board-v1';
const urlsToCache = [
  './',
  './MasjidBoard.html',
  './manifest.json'
];

// Install the Service Worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if found, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});

// Update the cache if a new version is detected
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
