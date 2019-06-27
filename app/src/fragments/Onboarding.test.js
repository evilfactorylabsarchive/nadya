import Onboarding from './Onboarding'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Onboarding.js', () => {
  test('It should render Onboarding screen', () => {
    const { container } = render(<Onboarding />)

    expect(container).toBeInTheDocument()
  })
})
