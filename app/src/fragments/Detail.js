import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SimpleIcon from 'simple-icons-react-component'
import dayjs from 'dayjs'

import { navigate } from '@reach/router'
import { getPeriod, toCurrency } from '../utils'
import { getSubscription } from '../services/subscription'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { deleteSubscription } from '../services/subscription'

function AlertDialog({
  isDialogOpen,
  handleClose,
  subscriptionId,
  subscriptionTitle
}) {
  const handleDelete = () => {
    deleteSubscription(subscriptionId).then(() => {
      navigate('/', { replace: true })
    })
  }

  return (
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
}

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

export default ({ subscription_id }) => {
  const classes = useStyles()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [subscription, setSubscription] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleCloseDialog = () => setDialogOpen(false)
  const confirmDelete = () => {
    handleClose()
    setDialogOpen(true)
  }

  useEffect(() => {
    getSubscription(subscription_id).then(doc => {
      setSubscription(doc)
    })
  }, [subscription_id])

  return (
    <>
      {subscription && subscription.title && (
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
                  <MenuItem
                    onClick={() => navigate(`/${subscription._id}/edit`)}
                  >
                    Ubah
                  </MenuItem>
                  <MenuItem onClick={confirmDelete}>Hapus</MenuItem>
                </Menu>
              </>
            }
          />
          <CardContent>
            <div className={classes.imageContainer}>
              <SimpleIcon name={subscription.title} />
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
            handleClose={handleCloseDialog}
            isDialogOpen={isDialogOpen}
          />
        </Card>
      )}
    </>
  )
}
