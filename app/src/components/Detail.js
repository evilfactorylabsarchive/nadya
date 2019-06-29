import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
  Menu,
  MenuItem,
  CardHeader,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import SimpleIcon from 'simple-icons-react-component'
import dayjs from 'dayjs'

import { getPeriod, toCurrency } from 'utils'

const useStyles = makeStyles({
  card: {
    textAlign: 'center',
    minWidth: 275
  },
  imageContainer: {
    width: 120,
    margin: 'auto',
    marginBottom: 20
  },
  pos: {
    marginBottom: 12
  }
})

const AlertDialog = ({
  isDialogOpen,
  handleClose,
  subscriptionTitle,
  handleDelete
}) => (
  <div>
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Hapus {subscriptionTitle}?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Apakah kamu yakin ingin menghapus subscription ini?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autoFocus>
          Kembali
        </Button>
        <Button onClick={handleDelete}>Hapus</Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default ({ subscription, handleDelete }) => {
  const classes = useStyles()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleEdit = () => navigate(`/${subscription._id}/edit`)
  const handleCloseDialog = () => setDialogOpen(false)

  const confirmDelete = () => {
    handleClose()
    setDialogOpen(true)
  }

  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader
        action={
          <>
            <IconButton aria-label='Settings' onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>Ubah</MenuItem>
              <MenuItem onClick={confirmDelete}>Hapus</MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent>
        <div className={classes.imageContainer}>
          {subscription.title && <SimpleIcon name={subscription.title} />}
        </div>
        <Typography className={classes.pos} variant='h4'>
          {subscription.title}
        </Typography>
        <Typography>
          {toCurrency(subscription.cost)}/{getPeriod(subscription.period)}
        </Typography>
        <Typography variant='body2' component='p'>
          Sejak {dayjs(subscription.firstBill).format('DD MMMM YYYY')}
        </Typography>
      </CardContent>
      <AlertDialog
        subscriptionId={subscription._id}
        subscriptionTitle={subscription.title}
        handleDelete={handleDelete}
        handleClose={handleCloseDialog}
        isDialogOpen={isDialogOpen}
      />
    </Card>
  )
}
