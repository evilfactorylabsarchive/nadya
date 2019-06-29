import Detail from './Detail'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Detail.js', () => {
  test('It should render Detail screen', () => {
    const subscription = {
      title: 'Spotify'
    }
    const handleDelete = () => {}
    const { container } = render(
      <Detail handleDelete={handleDelete} subscription={subscription} />
    )

    expect(container).toBeInTheDocument()
  })
})
