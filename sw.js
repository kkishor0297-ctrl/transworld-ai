const CACHE_NAME = 'transworld-ai-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/languages.js',
  '/logo.png',
  '/manifest.json'
];

self.addEventListener('install', e=> e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache))));
self.addEventListener('fetch', e=> e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
