// Cache ID Version
const cacheID = 'v1';
// Files to precache
const cacheFiles = [
    // HTML Files
    'login.html',
    'signUp.html',
    'homepage.html',
    'addGame.html',
    'addPlayer.html',
    'editGame.html',
    'editGameButtons.html',
    'editGameStats.html',
    'editPlayer.html',
    'editPlayerStats.html',
    'editTeamStats.html',
    'gameSchedule.html',
    'viewGameStats.html',
    'viewPlayer.html',
    'viewPlayers.html',
    // CSS Files
    'localcss.css',
    // Image Files
    'images/icons/soccerball16.png',
    'images/icons/soccerball32.png',
    'images/icons/soccerball64.png',
    'images/icons/soccerball128.png',
    'images/icons/soccerball256.png',
    'images/icons/soccerball512.png',
    '/res/soccerball.png',
    // JS Files
    'sw.js',
    'main.js',
    'firebase-app.js',
    'firebase-auth.js',
    'firebase-database.js',
    'firebase-firestore.js',
    'js/addGame.js',
    'js/addPlayer.js',
    'js/editGame.js',
    'js/editPlayer.js',
    'js/editPlayerStats.js',
    'js/editTeamStats.js',
    'js/gameSchedule.js',
    'js/homepage.js',
    'js/login.js',
    'js/signup.js',
    'js/viewGameStats.js',
    'js/viewPlayer.js',
    'js/viewPlayers.js',
    // Misc. Files
    'manifest.webmanifest',
];

// Service Worker Install Event
self.addEventListener('install', function(event) {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(cacheID)
            .then(function(cache) {
                return cache.addAll(cacheFiles);
            })
            .catch(function(error) {
                console.log(`Unable to add cached assets: ${error}`);
            })
    );
});

// Service Worker Activate Event
self.addEventListener('activate', function(e) {
    e.waitUntil(
        // Load up all items from cache, and check if cache items are not outdated
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheID) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Service Worker Fetch Event
self.addEventListener('fetch', function(e) {
    e.respondWith(
        // If request matches with something in cache, then return reponse
        // from cache, otherwise fetch it
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});