/* Catàleg NEXE per a clients: web sempre en línia, sense còpia offline.
 * Aquest service worker només elimina la còpia que desaven les versions anteriors. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (list) { list.forEach(function (c) { c.navigate(c.url); }); })
  );
});
