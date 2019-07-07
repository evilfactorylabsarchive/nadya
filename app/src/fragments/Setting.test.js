import Setting from './Setting'
import { StateMock } from '@react-mock/state'

afterAll(async () => {
  await cleanup()
})

const renderSetting = ({ user }) =>
  render(
    <StateMock state={{ user }}>
      <Setting />
    </StateMock>
  )

describe('Fragments: Setting.js', () => {
  test('It should render Setting screen', () => {
    const { container } = renderSetting({
      user: {
        _id: '',
        created_at: new Date(1562000400000)
      }
    })

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
