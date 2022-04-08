importScripts('js/sw-access.js')

const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'
const INMUTABLE_CACHE = 'inmutable-v1'

const APP_SHELL = [
    // '/',
    'index.html',
    'js/app.js',
    'css/style.css',
    'images/favico.ico',
    'images/avs/img1.png',
    'images/avs/img2.png',
    'images/avs/img3.png',
    'images/avs/img4.png',
]

const APP_INMUTABLE = [
    'https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css',
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'js/libs/jquery.js'
]

self.addEventListener('install', event => {
    const cacheStatic = caches.open(STATIC_CACHE)
        .then(cache => {
            cache.addAll(APP_SHELL)
        })

    const cacheInmutable = caches.open(INMUTABLE_CACHE)
        .then(cache => {
            cache.addAll(APP_INMUTABLE)
        })

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]))
})

self.addEventListener('activate', event => {
    const response = caches.keys()
        .then(keys => {
            keys.forEach(key => {
                if (key !== STATIC_CACHE && key.includes('static')) {
                    return caches.delete(key)
                }
            })
        })

    event.waitUntil(response)
})

self.addEventListener('fetch', event => {
    const response = caches.match(event.request)
        .then(res => {
            if (res) {
                return res
            }

            return fetch(event.request)
                .then(newRes => {
                    return updateDynamicCache(DYNAMIC_CACHE, event.request, newRes)
                })
        })
})