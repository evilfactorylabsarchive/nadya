import db from '../db'
import { generateUuid } from '../utils.js'

export async function checkLogin() {
  try {
    const user = await db.get('user')
    return user
  } catch (err) {
    throw err
  }
}

export async function registerUser() {
  try {
    const newUser = db.put({
      _id: 'user',
      id: generateUuid(),
      name: null,
      created_at: Date.now(),
      updated_at: null,
      type: 'user'
    })
    return newUser
  } catch (err) {
    console.error(err)
  }
}
