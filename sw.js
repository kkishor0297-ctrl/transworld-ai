self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('transworld-ai').then(cache => cache.addAll([
            '/',
            '/index.html',
            '/languages.js',
            '/main.js',
            '/logo.png',
            '/manifest.json'
        ]))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
