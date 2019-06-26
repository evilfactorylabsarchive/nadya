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

export async function deleteSubscription(subscriptionId) {
  try {
    const doc = await db.get(subscriptionId)
    const deleteSubscription = await db.remove(doc._id, doc._rev)
    return deleteSubscription
  } catch (err) {
    console.error(err)
  }
}

export async function getSubscription(subscriptionId) {
  try {
    const subscription = await db.get(subscriptionId)
    return subscription
  } catch (err) {
    console.error(err)
  }
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
  const { firstBill, serviceId, title, period, cost } = payload
  try {
    const addSubscription = await db.put({
      _id: generateUuid(),
      serviceId,
      title,
      period,
      cost,
      firstBill: new Date(firstBill).getTime(),
      createdAt: Date.now(),
      updatedAt: null
    })
    return addSubscription
  } catch (err) {
    console.error(err)
  }
}
