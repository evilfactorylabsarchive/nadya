import Setting from './Setting'

afterAll(async () => {
  await cleanup()
})

describe('Fragments: Setting.js', () => {
  test('It should render Setting screen', () => {
    const user = {
      _id: 'xxx',
      created_at: new Date(1562000400000)
    }
    const updateUser = () => {}
    const { container } = render(
      <Setting user={user} updateUser={updateUser} />
    )

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
