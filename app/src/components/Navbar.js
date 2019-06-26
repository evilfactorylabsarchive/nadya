import React from 'react'
import { navigate } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function ButtonAppBar({ title, shouldUseBackIcon }) {
  const classes = useStyles()
  const handleClick = () => {
    if (shouldUseBackIcon) {
      if (window.history.state) {
        window.history.back()
      } else {
        navigate('/')
      }
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            onClick={handleClick}
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'
          >
            {shouldUseBackIcon ? <BackIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.defaultProps = {
  title: 'Manage Subscriptions',
  shouldUseBackIcon: false
}
