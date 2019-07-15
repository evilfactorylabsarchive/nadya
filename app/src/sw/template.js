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

const DB_NAME = '@nadya:workers'
const DB_VERSION = 1

let idbInstance

function getObjectStore(dbInstance, storeName, mode) {
  const tx = dbInstance.transaction(storeName, mode)
  return tx.objectStore(storeName)
}

function createIdbInstance() {
  const db = indexedDB.open(DB_NAME, DB_VERSION)

  db.onsuccess = function(e) {
    idbInstance = this.result
  }

  db.onerror = function(e) {
    console.error('idb:', e.target.errorCode)
  }

  db.onupgradeneeded = function(e) {
    const store = e.currentTarget.result.createObjectStore('notifications', {
      keyPath: 'id',
      autoIncrement: true
    })
  }
}

function showNotification(payload) {
  const title = payload.title || 'Notification title'
  const body = payload.body || 'Notification body'

  self.registration.showNotification(title, {
    body: body,
    icon: 'https://inside.evilfactory.id/images/logo.png',
    tag: payload._id
  })
}

function check(queue) {
  const today = new Date().getDate()

  if (queue) {
    for (let index in queue) {
      if (new Date(queue[index].billedAt).getDate() === today) {
        showNotification({
          title: queue[index].title,
          body: queue[index].cost,
          index
        })
      } else {
        console.log('not today', queue[index])
      }
    }
  }
}

function startTimer(queue) {
  const ONE_MONTH = 720 // 24 (hours) * 30 (day)
  const ONE_HOUR = 3600000

  let counter = 0

  const timerInstance = setInterval(function() {
    counter++

    check(queue)

    if (counter >= ONE_MONTH) {
      clearInterval(timerInstance)
      console.log('Timer expired')
    }
  }, ONE_HOUR)
}

if (!idbInstance) {
  createIdbInstance()
}

self.addEventListener('message', function(e) {
  const payload = e.data

  if (payload.type === 'NOTIFICATION') {
    const notificationStore = getObjectStore(
      idbInstance,
      'notifications',
      'readwrite'
    )

    notificationStore.get('newest').onsuccess = function(e) {
      const queue = e.target.result

      delete e.target.result.id

      startTimer(e.target.result)
    }
  }
})
