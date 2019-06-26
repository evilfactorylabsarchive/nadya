import Shell from './Shell'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Shell.js', () => {
  test('Fab click & show fullscreen dialog', () => {
    const { container } = render(<Shell />)

    expect(container).toBeInTheDocument()
  })
})
