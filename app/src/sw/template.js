if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  )
  if (workbox) {
    console.log('Workbox is loaded')

    workbox.precaching.precacheAndRoute([])
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    })

    workbox.routing.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, // setahun
            maxEntries: 30
          })
        ]
      })
    )

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // sebulan
          })
        ]
      })
    )
  } else {
    console.log('Workbox could not be loaded. No Offline support')
  }
}
