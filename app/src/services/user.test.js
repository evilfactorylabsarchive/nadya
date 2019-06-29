import { checkLogin, registerUser, getUser, updateUser } from './user'

describe('user service', () => {
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

  it('should register new user', async () => {
    const actual = await registerUser()

    expect(actual.ok).toEqual(true)
    expect(actual.id).toBeTruthy()
  })
})
