import Detail from './Detail'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Detail.js', () => {
  test('It should render Detail screen', () => {
    const subscription = {
      title: 'Spotify',
      firstBill: new Date(1565370000000)
    }
    const handleDelete = () => {}
    const { container } = render(
      <Detail handleDelete={handleDelete} subscription={subscription} />
    )

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
