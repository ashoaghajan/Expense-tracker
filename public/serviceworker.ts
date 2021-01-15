const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];


// Install SW
self.addEventListener('install', (e: any) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (e: any) => {
    e.respondWith(
        caches.match(e.request)
            .then(() => {
                return fetch(e.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (e: any) => {
    const cacheWhitelist: any[] = [];
    cacheWhitelist.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))  
    )
});