import Dialog from './Dialog'

it('should render correctly', () => {
  const { container } = render(
    <Dialog
      isDialogOpen={true}
      handleAction={() => {}}
      handleClose={() => {}}
      title='Dialog title'
      action={() => {}}
    />
  )

  expect(container).toBeInTheDocument()
  expect(container).toMatchSnapshot()
})
