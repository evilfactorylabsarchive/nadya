import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'

export default ({
  isDialogOpen,
  handleAction,
  handleClose,
  title,
  action,
  children
}) => (
  <Dialog open={isDialogOpen} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color='primary' autoFocus>
        Batal
      </Button>
      <Button onClick={handleAction}>{action}</Button>
    </DialogActions>
  </Dialog>
)
