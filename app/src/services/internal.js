import db from '../db'
import { USER_ID_FROM_LS } from '../constants'

export async function deleteAllDatas() {
  try {
    await db.destroy()
    localStorage.removeItem(USER_ID_FROM_LS)
    return Promise.resolve('ok')
  } catch (err) {
    return Promise.reject(err)
  }
}
