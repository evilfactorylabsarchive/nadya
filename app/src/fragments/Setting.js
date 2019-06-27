import React, { useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import dayjs from 'dayjs'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Avatar,
  Grid
} from '@material-ui/core'

import { deepOrange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { getUser, getUserIdFromLS, updateUser } from 'services/user'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 90,
    height: 90,
    fontSize: 48,
    marginTop: theme.spacing(4),
    backgroundColor: deepOrange[500],
    color: '#fff'
  },
  input: {
    marginTop: theme.spacing(2)
  },
  action: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

export default () => {
  const classes = useStyles()
  const userId = getUserIdFromLS()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getUser(userId).then(user => {
      setUser(user)
      setUserName(user.name)
    })
  }, [userId])

  const handleSave = () => {
    const payload = {
      _id: userId,
      _rev: user._rev,
      created_at: user.created_at,
      name: userName
    }
    updateUser(payload)
      .then(_ => {
        setSnackbarOpen(true)
        getUser(userId).then(user => {
          setUser(user)
          setUserName(user.name)
        })
      })
      .catch(err => {
        throw err
      })
  }

  return (
    <>
      <Card>
        <Grid container justify='center' alignItems='center'>
          <Avatar className={classes.avatar}>
            {userName ? userName.charAt(0).toUpperCase() : 'N'}
          </Avatar>
        </Grid>
        <CardContent>
          <TextField
            className={classes.input}
            variant='outlined'
            value={user._id}
            label='User ID'
            margin='dense'
            fullWidth={true}
            disabled={true}
          />
          <TextField
            className={classes.input}
            variant='outlined'
            value={dayjs(user.created_at).format('DD MMMM YYYY')}
            label='Member sejak'
            margin='dense'
            fullWidth={true}
            disabled={true}
          />
          <TextField
            className={classes.input}
            variant='outlined'
            value={userName}
            label='Nama'
            margin='dense'
            onChange={e => setUserName(e.target.value)}
            fullWidth={true}
          />
        </CardContent>
        <CardActions>
          <Button
            className={classes.action}
            color='primary'
            variant='contained'
            onClick={handleSave}
          >
            Simpan
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={<span id='message-id'>Data berhasil disimpan</span>}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </>
  )
}
