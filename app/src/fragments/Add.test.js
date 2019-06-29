import Add from './Add'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Add.js', () => {
  test('It should render Add screen', () => {
    const { container } = render(<Add />)

    expect(container).toBeInTheDocument()
  })
})
