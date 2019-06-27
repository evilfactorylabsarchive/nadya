import { userDb } from '../db'
import { USER_ID_FROM_LS } from '../constants'
import { generateUuid } from '../utils.js'

export async function getUser(userId) {
  try {
    const user = await userDb.get(userId)
    return user
  } catch (err) {
    throw err
  }
}

export async function updateUser(payload) {
  const { _id, _rev, created_at, name } = payload
  try {
    const updateUser = await userDb.put({
      _id,
      _rev,
      created_at,
      name
    })
    return updateUser
  } catch (err) {
    throw err
  }
}

// We use this for the next version
// user can with multiple account at once
export function getUserIdFromLS() {
  const userId = window.localStorage.getItem(USER_ID_FROM_LS)
  return userId
}

export async function checkLogin() {
  try {
    const user = await userDb.allDocs()
    return user
  } catch (err) {
    throw err
  }
}

export async function registerUser() {
  try {
    const newUser = await userDb.put({
      _id: generateUuid(),
      name: null,
      created_at: Date.now(),
      updated_at: null
    })
    localStorage.setItem(USER_ID_FROM_LS, newUser.id)
    return newUser
  } catch (err) {
    console.error(err)
  }
}
