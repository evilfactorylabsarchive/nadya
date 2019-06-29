import Navbar from './Navbar'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Navbar.js', () => {
  test('It should render Navbar screen', () => {
    const { container } = render(<Navbar />)

    expect(container).toBeInTheDocument()
  })
})
