import db from '../db'
import { generateUuid } from '../utils'
import { SUBSCRIPTIONS } from '../constants'
import { handleNotFound } from 'services/helpers'

/**
 * Notes about handling error
 *
 * We expect there is *only* one error, and it should be 404
 * Because when we query to "empty" id docs, PouchDB will mark
 * it as a `Error`
 *
 * For all error except 404, we will mark it as our debt
 */

/**
 * Delete existing subscription data
 *
 * @param {string} subscriptionId
 * @return {Object} PromiseObject
 */
export async function deleteSubscription(subscriptionId) {
  const doc = await db.get(subscriptionId)
  const deleteSubscription = await db.remove(doc._id, doc._rev)
  return deleteSubscription
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
    return handleNotFound(err)
  }
}

/**
 * List all subscriptions data
 *
 * @return {Object} PromiseObject
 */
export async function listSubscription() {
  const subscriptions = await db.find({
    selector: {
      type: {
        $eq: SUBSCRIPTIONS
      }
    }
  })
  return subscriptions.docs
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
  const addSubscription = await db.put({
    _id: generateUuid(),
    title,
    period,
    cost,
    owner,
    firstBill: new Date(firstBill).getTime(),
    createdAt: Date.now(),
    updatedAt: null,
    type: SUBSCRIPTIONS
  })
  return addSubscription
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
  const updateSubscription = await db.put({
    _id,
    _rev,
    period,
    title,
    cost,
    owner,
    firstBill,
    createdAt,
    updatedAt: Date.now(),
    type: SUBSCRIPTIONS
  })
  return updateSubscription
}
