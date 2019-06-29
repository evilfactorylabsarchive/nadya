import {
  addSubscription,
  listSubscription,
  updateSubscription
} from 'services/subscription'

describe('subscription service', () => {
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

  it('should have subscriptions', async () => {
    const subscription = await listSubscription()

    expect(subscription.total_rows).not.toBe(0)
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
