import LazyNavbar from './Lazy'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Lazy.js', () => {
  test('It should render Lazy screen', () => {
    const { container } = render(<LazyNavbar component='./Navbar' />)

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
