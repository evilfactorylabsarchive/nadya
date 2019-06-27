import Edit from './Edit'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Edit.js', () => {
  test('It should render Edit screen', () => {
    const { container } = render(<Edit />)

    expect(container).toBeInTheDocument()
  })
})
