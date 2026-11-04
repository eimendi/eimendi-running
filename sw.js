/**
 * Eimendi Running - Service Worker para Soporte Offline (PWA)
 */

const CACHE_NAME = 'eimendi-running-v2';
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
  // Para páginas de navegación (index.html): Red primero, con respaldo en caché para modo offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        return caches.match('./index.html');
      })
    );
    return;
  }

  // Para otros recursos: buscar en caché y si no está, ir a la red
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {});
    })
  );
});
