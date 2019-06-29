import db from '../db'
import { generateUuid } from '../utils'

/**
 * Create "delegator" for listening db update changes
 *
 * @param {Function} cb - callback that fired when there are db changes
 * @return {EventEmitter} - listener instance
 */
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

/**
 * Delete the "instance" that listening to db changes
 *
 * @return {void}
 */
export function unlistenUpdate(listenerInstance) {
  listenerInstance.cancel()
}

/**
 * Delete existing subscription data
 *
 * @param {string} subscriptionId
 * @return {Object} PromiseObject
 */
export async function deleteSubscription(subscriptionId) {
  try {
    const doc = await db.get(subscriptionId)
    const deleteSubscription = await db.remove(doc._id, doc._rev)
    return deleteSubscription
  } catch (err) {
    throw err
  }
}

/**
 * Get single subscription data
 *
 * @param {string} subscriptionId
 * @return {Object} PromiseObject
 */
export async function getSubscription(subscriptionId) {
  try {
    const subscription = await db.get(subscriptionId)
    return subscription
  } catch (err) {
    throw err
  }
}

/**
 * List all subscriptions data
 *
 * @return {Object} PromiseObject
 */
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

/**
 * Add new subscription data
 *
 * @param {Object} payload - required data for creating new subscriptio
 * @param {Date} payload.firstBill - an unix-style timestamp
 * @param {string} payload.title - service title. e.g: Spotify
 * @param {string|number} payload.period - the "interval". e.g: monthly
 * @param {number} payload.cost - cost "number" per period
 * @param {string} payload.owner - a userId string represent the "creator"
 * @return {Object} PromiseObject
 */
export async function addSubscription(payload) {
  const { firstBill, title, period, cost, owner } = payload
  try {
    const addSubscription = await db.put({
      _id: generateUuid(),
      title,
      period,
      cost,
      owner,
      firstBill: new Date(firstBill).getTime(),
      createdAt: Date.now(),
      updatedAt: null
    })
    return addSubscription
  } catch (err) {
    throw err
  }
}

/**
 * Update existing subscription data
 * but instead mutating existing, it will create the new ones
 *
 * visualize:
 *
 * 1. get the data we want to mutate/update: [data]
 * 2. get the "revision id" for that: [data._rev]
 * 3. update old data with the existing ones: [newData]
 * 4. assign the _rev to the newest "revision id"
 *
 * @param {Object} payload - required data for creating new subscription
 * @param {string} payload._rev - a uuid-style text taken from the data we want change
 * @param {string} payload._id - an unique uuid-style text that refer to the data we want change
 * @param {string|number} payload.period - the "interval". e.g: monthly
 * @param {number} payload.cost - cost "number" per period
 * @param {string} payload.owner - a userId string represent the "creator"
 * @param {Date} payload.firstBill - an unix-style timestamp
 * @param {Date} payload.createdAt - an unix-style timestamp when this subscription being created
 * @param {string} payload.title - service title. e.g: Spotify
 * @return {Object} PromiseObject
 */
export async function updateSubscription(payload) {
  const {
    _rev,
    _id,
    period,
    cost,
    owner,
    firstBill,
    createdAt,
    title
  } = payload
  try {
    const updateSubscription = await db.put({
      _id,
      _rev,
      period,
      title,
      cost,
      owner,
      firstBill,
      createdAt,
      updatedAt: Date.now()
    })
    return updateSubscription
  } catch (err) {
    throw err
  }
}
