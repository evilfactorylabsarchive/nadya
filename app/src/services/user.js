import { userDb } from '../db'
import { generateUuid } from '../utils.js'

export async function getUser() {
  try {
    const user = await userDb.allDocs({
      include_docs: true
    })
    return user.rows[0].doc
  } catch (err) {
    throw err
  }
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
    const newUser = userDb.put({
      _id: generateUuid(),
      name: null,
      created_at: Date.now(),
      updated_at: null
    })
    return newUser
  } catch (err) {
    console.error(err)
  }
}
