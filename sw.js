let staticCache = 'restaurant-static';

// Installation

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(staticCache).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg'
      ]);
    })
  );
});

// Activate

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                  cacheName != staticCache;
        }).map(function(cacheName) {
              return caches.delete(cacheName);
        })
      );
    })
  );
})

// Fetching

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
    .then(function(response) {
      return response || fetch(e.request);
    })
  );
});
