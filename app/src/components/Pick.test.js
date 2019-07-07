import Pick from './Pick'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Pick.js', () => {
  test('It should render Pick screen', () => {
    const handleTopLevelClose = () => {}
    const handleBack = () => {}
    const activeSubscription = { title: 'Spotify' }
    const { container } = render(
      <Pick
        handleBack={handleBack}
        handleTopLevelClose={handleTopLevelClose}
        activeSubscription={activeSubscription}
      />
    )

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
