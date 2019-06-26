import db from '../db'
import { generateUuid } from '../utils'

export async function addSubscription(payload) {
  const { serviceId, title, period } = payload
  try {
    const addSubscription = db.put({
      _id: generateUuid(),
      serviceId,
      title,
      period,
      created_at: Date.now(),
      updated_at: null,
      type: 'subscriptions'
    })
    return addSubscription
  } catch (err) {
    console.error(err)
  }
}
