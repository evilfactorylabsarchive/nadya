import Detail from './Detail'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Detail.js', () => {
  test('It should render Detail screen', () => {
    const { container } = render(<Detail />)

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
