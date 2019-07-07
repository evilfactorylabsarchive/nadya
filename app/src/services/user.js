import db from '../db'
import { USER_ID_FROM_LS, USER } from '../constants'
import { generateUuid } from '../utils.js'
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
 * Get existing user data
 * @param {string} userId - an unique text that refer to our data
 * @return {Object} PromiseObject
 */
export async function getUser(userId) {
  if (!userId) return Promise.reject('userId cannot empty')

  try {
    const user = await db.get(userId)
    return user
  } catch (err) {
    return handleNotFound(err)
  }
}

/**
 * Update existing user data
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
 * @param {string} payload._id - an unique uuid-style text that refer to the data we want change
 * @param {string} payload._rev - a uuid-style text taken from the data we want change
 * @param {Date} payload.createdAt - an unix-style timestamp when this subscription being created
 * @param {string} payload.name - name of user title. e.g: Spotify
 */
export async function updateUser(payload) {
  const { _id, _rev, createdAt, name } = payload
  const updateUser = await db.put({
    _id,
    _rev,
    createdAt,
    name,
    updatedAt: Date.now(),
    type: USER
  })
  return updateUser
}

/**
 * get userId from localStorage
 * We use this for the next version
 * so user can login with multiple account at one app
 *
 * @return {string} uuid-style text represent current loggedin user
 */
export function getUserIdFromLS() {
  const userId = window.localStorage.getItem(USER_ID_FROM_LS)
  return userId
}

/**
 * Check is user was logged in to our app?
 * this useful for checking their first-time usage
 *
 * @return {Object} PromiseObject
 */
export async function checkLogin() {
  const user = await db.find({
    selector: {
      type: {
        $eq: USER
      }
    },
    fields: ['_id', 'type']
  })
  if (!user.docs.length) {
    return Promise.reject('Unauthorized')
  } else {
    return user.docs
  }
}

/**
 * Register user
 * this is frequently being called on Onboarding fragment
 *
 * @return {Object} PromiseObject
 */
export async function registerUser() {
  const newUser = await db.put({
    _id: generateUuid(),
    name: null,
    createdAt: Date.now(),
    updatedAt: null,
    type: USER
  })
  localStorage.setItem(USER_ID_FROM_LS, newUser.id)
  return newUser
}
