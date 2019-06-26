import db from '../db'
import { generateUuid } from '../utils'

let listener

export async function listenUpdate(cb) {
  listener = db
    .changes({
      since: 'now',
      live: true,
      include_docs: true
    })
    .on('change', change => cb(change))
}

export function unlistenUpdate() {
  listener.cancel()
}

export async function listSubscription() {
  try {
    const subscriptions = await db.allDocs({
      include_docs: true,
      descending: true
    })
    return subscriptions
  } catch (err) {
    console.error(err)
  }
}

export async function addSubscription(payload) {
  const { serviceId, title, period, cost } = payload
  try {
    const addSubscription = await db.put({
      _id: generateUuid(),
      serviceId,
      title,
      period,
      cost,
      created_at: Date.now(),
      updated_at: null
    })
    return addSubscription
  } catch (err) {
    console.error(err)
  }
}
