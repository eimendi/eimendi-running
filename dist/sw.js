/**
 * Eimendi Running - Service Worker para Soporte Offline (PWA)
 */

const CACHE_NAME = 'eimendi-running-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './src/utils/paceCalculator.js',
  './src/data/initialPlan.js',
  './src/data/resources.js',
  './src/utils/calendarExport.js',
  './src/utils/pdfExport.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // En caso de fallo de red en navegación, devolver index.html de caché
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

