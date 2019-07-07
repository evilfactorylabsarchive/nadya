import {
  checkLogin,
  registerUser,
  getUser,
  updateUser,
  getUserIdFromLS
} from './user'

import { USER_ID_FROM_LS } from '../constants'

describe('user service', () => {
  it('should check invalid login', async () => {
    localStorage.removeItem(USER_ID_FROM_LS)
    await expect(checkLogin()).rejects.toEqual('Unauthorized')
  })

  it('should check a valid login', async () => {
    const actual = await registerUser()
    const expected = await checkLogin()

    expect(expected.id).toEqual(actual._id)
  })

  it('should get user', async () => {
    const expected = await registerUser()
    const actual = await getUser(expected.id)

    expect(actual.id).toEqual(expected._id)
  })

  it('should get empty user', async () => {
    const user = await getUser('3v1lf4ct0ry')

    expect(user).toEqual(0)
  })

  it('should update user', async () => {
    const user = await registerUser()
    const payload = {
      _id: user.id,
      _rev: user.rev,
      createdAt: user.createdAt,
      name: 'evilfactory'
    }
    const update = await updateUser(payload)
    const actual = await getUser(user.id)

    expect(update.ok).toEqual(true)
    expect(actual.name).toEqual('evilfactory')
  })

  it('should get user id', () => {
    expect(getUserIdFromLS()).toBeTruthy()
  })

  it('should register new user', async () => {
    const actual = await registerUser()

    expect(actual.ok).toEqual(true)
    expect(actual.id).toBeTruthy()
  })
})
