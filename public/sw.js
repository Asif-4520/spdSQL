//    Service Worker – SQLIO Application

const CACHE_VERSION = 'v2';
const CACHE_NAME = `sqlio-cache-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
    '/index.html',
    '/styles/index.css',
    '/extension/excel.wasm',
    '/extension/json.wasm',
    '/extension/parquet.wasm',
    '/extension/sqlite_scanner.wasm',
];
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key))
                )
            )
    );

    self.clients.claim();
});

function shouldCache(request, response) {
    if (!response || response.status !== 200) return false;
    if (request.method !== 'GET') return false;

    const url = new URL(request.url);

    if (url.origin !== self.location.origin) return false;

    return (
        url.pathname.endsWith('.wasm') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css')
    );
}

self.addEventListener('fetch', (event) => {
    const req = event.request;

    if (req.method !== 'GET') return;

    if (req.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const copy = res.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(req, copy));
                    return res;
                })
                .catch(() => caches.match(req))
        );
        return;
    }

    event.respondWith(
        caches.match(req).then((cached) => {
            if (cached) return cached;

            return fetch(req).then((res) => {
                if (shouldCache(req, res)) {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(req, copy);
                    });
                }
                return res;
            });
        })
    );
});
