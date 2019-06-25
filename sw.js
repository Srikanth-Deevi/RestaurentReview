let myCacheName = "cacheData";
let load = [
  // './',
  // './index.html',
  // './restaurant.html',
  // './css/style.css',
  // './data/restaurant.json',
  // './img/1.jpg',
  // './img/2.jpg',
  // './img/3.jpg',
  // './img/4.jpg',
  // './img/5.jpg',
  // './img/6.jpg',
  // './img/7.jpg',
  // './img/8.jpg',
  // './img/9.jpg',
  // './img/10.jpg',
  // './js/dbhelper.js',
  // './main.js',
  // './restaurant_info.js',
  // './CODEOWNERS',
  // './restaurant.html',
  // './README.md'
];
// install the service warker
this.addEventListener('install', (a) => {
  // wait until the data is loaded
  a.waitUntil(
    //open a cache with the given name cacheData
    caches.open(myCacheName).then((ca) => {
      //add all files load array to cache.
      ca.addAll(load);
    })
  );
});
this.addEventListener('fetch', (a) => {
  a.respondWith(
    //open the cache.
    caches.open(myCacheName).then((ca) => {
      //request for match.
      return ca.match(a.request).then((res) => {
        //if found in catche return it.
        //or fetch it from the server.
        return res || fetch(a.request).then((res) => {
          //after fetching put the fetched data into a cache and then return it.
          ca.put(a.request, res.clone())
          return res;
        })
      })
    })
  )
});
//Activating the serviceWorker.
this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
