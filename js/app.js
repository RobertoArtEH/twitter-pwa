const URL = window.location.href
let PWA_LOCATION = '/twitter-pwa/sw.js'

if (navigator.serviceWorker) {
    if (URL.includes('localhost')) {
        PWA_LOCATION = '/sw.js'
    }

    navigator.serviceWorker.register(PWA_LOCATION)
}
