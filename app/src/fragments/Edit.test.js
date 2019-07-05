import Edit from './Edit'
import { StateMock } from '@react-mock/state'

afterAll(async () => {
  await cleanup()
})

const renderEdit = ({ subscription }) =>
  render(
    <StateMock state={{ subscription }}>
      <Edit />
    </StateMock>
  )

describe('Fragments: Edit.js', () => {
  test('It should render Edit screen', () => {
    const { container } = renderEdit({
      subscription: {
        title: '',
        firstBill: new Date(1562000400000)
      }
    })

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
