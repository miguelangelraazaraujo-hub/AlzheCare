const CACHE_NAME = 'alzhecare-v3';

const APP_SHELL = [
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/favicon192.png',
    '/favicon512.png',
    '/fonts/montserrat-variable.woff2'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            await cache.addAll(APP_SHELL);

            const response = await fetch('/index.html');
            const html = await response.text();

            const assetUrls = [
                ...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css))["']/g)
            ].map((match) => match[1]);

            await Promise.all(
                assetUrls.map(async (asset) => {
                    const assetResponse = await fetch(asset);

                    if (!assetResponse.ok) {
                        throw new Error(`No se pudo almacenar ${asset}`);
                    }

                    await cache.put(asset, assetResponse);
                })
            );
        })()
    );

    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();

            await Promise.all(
                keys
                    .filter((key) => key.startsWith('alzhecare-') && key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );

            await self.clients.claim();
        })()
    );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
          await cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch {
        if (request.mode === 'navigate') {
          const cachedPage = await cache.match('/index.html');

          if (cachedPage) {
            return cachedPage;
          }
        }

        return new Response('Recurso no disponible sin conexión', {
          status: 503,
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
        });
      }
    })()
  );
});