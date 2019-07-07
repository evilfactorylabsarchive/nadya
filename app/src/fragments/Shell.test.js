import Shell from './Shell'
import { StateMock } from '@react-mock/state'
import { waitForElement, fireEvent } from '@testing-library/react'

afterAll(async () => {
  await cleanup()
})

const renderShell = ({ subscriptions }) =>
  render(
    <StateMock state={{ subscriptions }}>
      <Shell />
    </StateMock>
  )

describe('Fragments: Shell.js', () => {
  it('should render without crash', () => {
    const { container } = render(<Shell />)
    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('should show empty state screen', async () => {
    const { getByText } = renderShell({ subscriptions: [] })
    await waitForElement(() => getByText(/empty/i))
  })

  it('should render at least one subscription', async () => {
    const { getByText } = renderShell({
      subscriptions: [{ _id: 0, title: 'evilfactory' }]
    })
    await waitForElement(() => getByText(/evilfactory/i))
  })

  test.todo('should navigate to subscription detail (L49)')
})
