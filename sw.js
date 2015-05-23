var version = 'v1';
var cacheName = 'bomp' + version;

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(cacheName).then(function(cache) {
    var assets = [
      './',
      'index.html',
      'css/bomp.css',
      'js/jquery-2.1.4.min.js',
      'js/bomp.js',
      'assets/aha.mp3',
      'assets/airhorn.mp3',
      'assets/cat.gif',
      'assets/damn.mp3',
      'assets/rob.mp3',
    ];
    return Promise.all(assets.map(function(asset) {
      return cache.add(asset);
    }));
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.open(cacheName).then(function(cache) {
    return cache.match(event.request).then(function(response) {
      if (!response) {
        console.log('failed to load from sw cache: ' + event.request.url);
        return fetch(event.request);
      }
      return response;
    });
  }));
});
