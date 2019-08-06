console.log('Service worker loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push has been received...');

    self.registration.showNotification(data.title, {
        body: 'Notified By Rajeev',
        icon: 'http://www.dewebsite.org/logo/shell/shell_logo.png'
    });
});

self.addEventListener('install', event => {
    console.log('INSTALL lifecycle');

    // cache a horse SVG into a new cache, static-v2
    // event.waitUntil(
    //   caches.open('static-v2').then(cache => cache.add('/horse.svg'))
    // );
});

self.addEventListener('activate', event => {
    console.log('ACTIVATE lifecycle');

    // delete any caches that aren't in expectedCaches
    // which will get rid of static-v1
    /*event.waitUntil(
        caches.keys().then(keys => Promise.all(
        keys.map(key => {
            if (!expectedCaches.includes(key)) {
            return caches.delete(key);
            }
        })
        )).then(() => {
        console.log('V2 now ready to handle fetches!');
        })
    );*/
});

self.addEventListener('fetch', event => {
    console.log('FETCH lifecycle');

    // serve the horse SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    /*const url = new URL(event.request.url);
    if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/horse.svg'));
    }*/
});




self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();
  
    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow('/');
    }));
});