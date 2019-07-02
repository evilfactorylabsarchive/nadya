import Pick from './Pick'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Pick.js', () => {
  test('It should render Pick screen', () => {
    const { container } = render(<Pick serviceName='666-evilfactory' />)

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
