import { userDb } from '../db'
import { USER_ID_FROM_LS } from '../constants'
import { generateUuid } from '../utils.js'

/**
 * Get existing user data
 * @param {string} userId - an unique text that refer to our data
 * @return {Object} PromiseObject
 */
export async function getUser(userId) {
  try {
    const user = await userDb.get(userId)
    return user
  } catch (err) {
    throw err
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
  try {
    const updateUser = await userDb.put({
      _id,
      _rev,
      createdAt,
      name,
      updatedAt: Date.now()
    })
    return updateUser
  } catch (err) {
    throw err
  }
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
  const userId = getUserIdFromLS()
  try {
    const user = await userDb.get(userId)
    return user
  } catch (err) {
    throw err
  }
}

/**
 * Register user
 * this is frequently being called on Onboarding fragment
 *
 * @return {Object} PromiseObject
 */
export async function registerUser() {
  try {
    const newUser = await userDb.put({
      _id: generateUuid(),
      name: null,
      createdAt: Date.now(),
      updatedAt: null
    })
    localStorage.setItem(USER_ID_FROM_LS, newUser.id)
    return newUser
  } catch (err) {
    console.error(err)
  }
}
