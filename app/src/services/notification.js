import dayjs from 'dayjs'

const DB_NAME = '@nadya:workers'
const DB_VERSION = 1

let idbInstance

export function addNotification(payload, cb) {
  const notification = getObjectStore(idbInstance, 'notifications', 'readwrite')
  const $payload = payload.map(data => {
    const today = dayjs()
    const currentDate = dayjs(data.firstBill)
    const isNextMonth = currentDate.diff(today, 'day')

    return {
      _id: data._id,
      title: data.title,
      cost: data.cost,
      owner: data.owner,
      billedAt: dayjs(data.firstBill)
        .add(isNextMonth < 0 ? 1 : 0, 'month')
        .valueOf()
    }
  })
  notification.clear()
  notification.add({ id: 'newest', ...$payload })
  cb(notification)
}

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
}

export function createNotification({ title, message }) {
  new Notification(title, {
    body: message,
    icon: '/images/icons/icon-384x384.png'
  })
}

if (!idbInstance) createIdbInstance()
