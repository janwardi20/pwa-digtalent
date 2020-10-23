//Menyimpan Aset ke Cache
const CACHE_NAME="footballpwa";
var urIsToCache=[
    "/",
    "/index.html",
    "/nav.html",
    "/team.html",
    "/pages/home.html",
    "/pages/favorite.html",
    "/pages/ranking.html",
    "/css/materialize.min.css",
    "/css/footer.css",
    "/css/home.css",
    "/css/ranking.css",
    "/images/notif.png",
    "/images/background.jpg",
    "/js/materialize.min.js",
    "/js/api.js",
    "/js/nav.js",
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(event){
            return cache.addAll(urIsToCache);
        })
    );
});
//agar Halaman menggunakan aset yang sudah disimpan di cache:
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME})
            .then(function(respons){
                if(response){
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }
                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});
//Menghapus Cache Lama
self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheName){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if (cacheName != CACHE_NAME){
                        console.log("ServerWorker: cachce " + cacheName + "dihapus" );
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});