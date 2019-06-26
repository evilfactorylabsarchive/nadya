import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import SimpleIcons from 'simple-icons-react-component'

import Subscriptions from '../data.json'
import LazyPick from './Lazy'

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

export default function FullScreenDialog({ open, handleClose, title }) {
  const classes = useStyles()
  const [filter, setFilter] = useState('')
  const [activeSubscription, setActiveSubscription] = useState({})

  const subscriptions = Subscriptions.filter(
    subscription =>
      filter === '' ||
      subscription.title.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
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
        {subscriptions.map(subscription => (
          <ListItem
            button
            key={subscription.id}
            onClick={() => setActiveSubscription(subscription)}
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
      {activeSubscription && activeSubscription.id && (
        <LazyPick
          activeSubscription={activeSubscription}
          handleClose={() => setActiveSubscription({})}
          handleTopLevelClose={handleClose}
          component='./Pick'
        />
      )}
    </Dialog>
  )
}

FullScreenDialog.defaultProps = {
  title: 'Tambahkan Subscription'
}
