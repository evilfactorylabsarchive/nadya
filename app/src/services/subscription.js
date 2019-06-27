import db from '../db'
import { generateUuid } from '../utils'

export function listenUpdate(cb) {
  const listener = db
    .changes({
      since: 'now',
      live: true,
      include_docs: true
    })
    .on('change', change => cb(change))
    .on('error', _ => listener.cancel())
  return listener
}

export function unlistenUpdate(listenerInstance) {
  listenerInstance.cancel()
}

export async function deleteSubscription(subscriptionId) {
  try {
    const doc = await db.get(subscriptionId)
    const deleteSubscription = await db.remove(doc._id, doc._rev)
    return deleteSubscription
  } catch (err) {
    throw err
  }
}

export async function getSubscription(subscriptionId) {
  try {
    const subscription = await db.get(subscriptionId)
    return subscription
  } catch (err) {
    throw err
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
    throw err
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
    throw err
  }
}

export async function updateSubscription(payload) {
  const { _rev, _id, period, cost, firstBill, createdAt, title } = payload
  try {
    const updateSubscription = await db.put({
      _id,
      _rev,
      period,
      title,
      cost,
      firstBill,
      createdAt,
      updatedAt: Date.now()
    })
    return updateSubscription
  } catch (err) {
    throw err
  }
}
