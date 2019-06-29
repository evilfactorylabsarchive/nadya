import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import SimpleIcons from 'simple-icons-react-component'
import CloseIcon from '@material-ui/icons/Close'

import Subscriptions from '../assets/data.json'

const useStyles = makeStyles(theme => ({
  list: {
    maxHeight: '100vh',
    overflowY: 'auto'
  },
  icon: {
    width: 40,
    minWidth: 40,
    marginRight: 20
  },
  appBar: {
    position: 'relative'
  },
  input: {
    margin: '0.5rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function FullScreenDialog({ handleClose, title }) {
  const classes = useStyles()
  const [filter, setFilter] = useState('')

  const subscriptions = Subscriptions.filter(
    subscription =>
      filter === '' ||
      subscription.title.toLowerCase().includes(filter.toLowerCase())
  )

  const pick = (index, subscription) => {
    navigate(`/pick/${index}-${subscription.id}/`)
  }

  return (
    <Dialog
      fullScreen
      open
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => navigate('/')}
            aria-label='Close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <TextField
        label='Filter'
        margin='dense'
        variant='outlined'
        className={classes.input}
        value={filter}
        onChange={input => setFilter(input.target.value)}
      />
      <List component='nav' className={classes.list}>
        {subscriptions.map((subscription, index) => (
          <ListItem
            button
            key={subscription.id}
            onClick={() => pick(index, subscription)}
          >
            <ListItemIcon className={classes.icon}>
              <SimpleIcons name={subscription.title} />
            </ListItemIcon>
            <ListItemText
              primary={subscription.title}
              secondary={subscription.url}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

FullScreenDialog.defaultProps = {
  title: 'Tambahkan Subscription'
}
