import Setting from './Setting'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Setting.js', () => {
  test('It should render Setting screen', () => {
    const { container } = render(<Setting />)

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
