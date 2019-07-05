import { StateMock } from '@react-mock/state'
import Detail from './Detail'

afterAll(async () => {
  await cleanup()
})

const renderDetail = ({ subscription }) =>
  render(
    <StateMock state={{ subscription }}>
      <Detail />
    </StateMock>
  )

describe('Fragments: Detail.js', () => {
  test('It should render Detail screen', () => {
    const { container } = renderDetail({
      subscription: {
        title: '',
        firstBill: new Date(1562000400000)
      }
    })

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
