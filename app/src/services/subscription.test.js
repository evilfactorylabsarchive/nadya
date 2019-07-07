import {
  addSubscription,
  listSubscription,
  updateSubscription,
  getSubscription,
  deleteSubscription
} from 'services/subscription'

describe('subscription service', () => {
  it('should get empty subscription', async () => {
    expect(await getSubscription('nope')).toEqual(0)
  })

  it('should get subscription', async () => {
    const subscription = await addSubscription({
      title: 'evilfactory',
      cost: 666,
      period: 0,
      owner: 'everyone',
      firstBill: new Date()
    })
    const actual = await getSubscription(subscription.id)
    expect(actual).toBeTruthy()
  })

  it('should add subscription', async () => {
    const actual = await addSubscription({
      title: 'evilfactory',
      cost: 50000,
      period: 0,
      owner: 'everyone',
      firstBill: new Date()
    })

    expect(actual.ok).toEqual(true)
    expect(actual.id).toBeTruthy()
  })

  it('should delete existing subscription', async () => {
    const subscription = await addSubscription({
      title: 'evilfactory',
      cost: 666,
      period: 0,
      owner: 'everyone',
      firstBill: new Date()
    })
    const actual = await deleteSubscription(subscription.id)
    expect(actual.ok).toEqual(true)
  })

  it('should list subscriptions', async () => {
    const subscriptions = await listSubscription()

    expect(subscriptions.length).not.toBe(0)
  })

  it('should update existing subscription', async () => {
    const subscription = await addSubscription({
      title: 'evilfactory',
      cost: 50000,
      period: 0,
      owner: 'everyone',
      firstBill: new Date()
    })
    const actual = await updateSubscription({
      _id: subscription.id,
      _rev: subscription.rev,
      title: subscription.title,
      firstBill: subscription.firstBill,
      createdAt: subscription.createdAt,
      period: 1
    })

    expect(actual.ok).toEqual(true)
    expect(actual.id).toBeTruthy()
  })
})
