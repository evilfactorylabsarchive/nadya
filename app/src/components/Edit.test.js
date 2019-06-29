import Edit from './Edit'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Edit.js', () => {
  test('It should render Edit screen', () => {
    const updateSubscription = () => {}
    const subscription = { title: 'Spotify' }
    const { container } = render(
      <Edit
        updateSubscription={updateSubscription}
        subscription={subscription}
      />
    )

    expect(container).toBeInTheDocument()
  })
})
