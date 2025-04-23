// sw.js
const CACHE_NAME = 'modp-pwa-v1';
const URLS_TO_CACHE = [
  '/login.html',
  '/perfil.html',
  '/historial.html',
  '/catalogovistausuario.html',
  '/carritocompras.html',
  '/masvendidos.html',
  '/faq.html',
  '/inicio.html',
  '/registro.html',
  '/resenias.html',
  '/media/style.css',
  '/media/icon/testicon.png',
  '/manifest.json'
];

self.addEventListener('install', event =>
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  )
);

self.addEventListener('activate', event =>
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  )
);

self.addEventListener('fetch', event => {
  // Si la petición es a /api, siempre pasa al network
  if (event.request.url.includes('/api/')) {
    return event.respondWith(fetch(event.request));
  }
  // En otro caso, sirve del cache o fetch normal
  event.respondWith(
    caches.match(event.request)
          .then(res => res || fetch(event.request))
  );
});
