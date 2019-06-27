import { createUserDbInstance } from '../db.helpers'
import { checkLogin, registerUser } from './user'

describe('', () => {
  let db

  beforeAll(async () => {
    db = await createUserDbInstance()
  })

  afterAll(async () => {
    await db.close()
  })

  it('should connected to db', async () => {
    const expected = { _id: 'ok' }
    await db.put(expected)
    const actual = await db.get('ok')
    expect(expected._id).toEqual(actual._id)
  })

  it('should show have user data', async () => {
    await db.post({
      name: 'Nadya'
    })
    const expected = await checkLogin()
    expect(expected).toBeTruthy()
  })
})
