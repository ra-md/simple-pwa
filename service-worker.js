const CACHE_NAME = '8-planet-v1';
const urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/css/materialize.min.css',
  '/js/materialize.min.js',
  '/css/style.css',
  '/js/main.js',
  '/img/lubo-minar-XFMamV1AvGQ-unsplash.jpg',
  '/img/bumi.jpg',
  '/img/jupiter.jpg',
  '/img/mars.jpg',
  '/img/merkurius.jpg',
  '/img/neptunus.jpg',
  '/img/saturnus.png',
  '/img/uranus.jpg',
  '/img/venus.jpg',
  '/pages/allPlanets.html',
  '/pages/bumi.html',
  '/pages/jupiter.html',
  '/pages/mars.html',
  '/pages/merkurius.html',
  '/pages/neptunus.html',
  '/pages/saturnus.html',
  '/pages/uranus.html',
  '/pages/venus.html'
];
 
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(response => {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }
 
        console.log('ServiceWorker: Memuat aset dari server: ', event.request.url);
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});