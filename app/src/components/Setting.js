import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import CloseIcon from '@material-ui/icons/Close'

import {
  Snackbar,
  IconButton,
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

export default ({ user, updateUser }) => {
  const classes = useStyles()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [userName, setUserName] = useState('')

  const handleSave = () => {
    updateUser(userName)
      .then(() => {
        setSnackbarOpen(true)
      })
      .catch(err => {
        throw err
      })
  }

  useEffect(() => {
    setUserName(user.name)
  }, [user])

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
            value={userName || ''}
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
