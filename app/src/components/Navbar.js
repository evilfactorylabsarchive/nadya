import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { navigate } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles'
import { deepOrange } from '@material-ui/core/colors'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import MenuIcon from '@material-ui/icons/Menu'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LogoType from '../assets/logotype.png'

import { APP_VER, A2HS_IDENTIFIER } from '../constants'
import { getUser, getUserIdFromLS } from 'services/user'

const useStyles = makeStyles(theme => ({
  appVer: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  list: {
    width: 250
  },
  root: {
    flexGrow: 1
  },
  avatar: {
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  title: {
    flexGrow: 1
  },
  logoContainer: {
    margin: 'auto',
    paddingRight: theme.spacing(4)
  },
  logoType: {
    float: 'left',
    width: 120
  }
}))

export default ({ path = '/' }) => {
  const classes = useStyles()
  const userId = getUserIdFromLS()

  const [a2hsDelegator, setA2hsDelegator] = useState({})
  const [appInstalled, setAppInstalled] = useState(true)
  const [shouldUseBackIcon, setShouldUseBackButton] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [user, setUser] = useState({})

  const checkIsInstalled = () => {
    setAppInstalled(true)
    window.localStorage.setItem(A2HS_IDENTIFIER, true)
  }

  const handleInstall = event => {
    event.preventDefault()
    setA2hsDelegator(event)
  }

  const addToHomeScreen = () => {
    a2hsDelegator.prompt()
    a2hsDelegator.userChoice.then(result => {
      if (result.outcome !== 'accepted') {
        console.log('Installed')
      }
    })
  }

  useEffect(() => {
    const isAppInstalled = window.localStorage.getItem(A2HS_IDENTIFIER)

    getUser(userId).then(user => {
      setUser(user)
    })

    setShouldUseBackButton(path !== '/')

    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(_ => {
        if (!isAppInstalled) {
          setAppInstalled(false)
        }
      })
    }

    if (!isAppInstalled) {
      window.addEventListener('appinstalled', checkIsInstalled)
      window.addEventListener('beforeinstallprompt', handleInstall)
    } else {
      setAppInstalled(true)
    }

    return function cleanup() {
      if (!isAppInstalled) {
        window.removeEventListener('appinstalled', checkIsInstalled)
        window.removeEventListener('beforeinstallprompt', handleInstall)
      }
    }
  }, [userId, path])

  const handleClick = () => {
    if (shouldUseBackIcon) {
      if (window.history.state) {
        window.history.back()
      } else {
        navigate('/')
      }
    } else {
      setDrawerOpen(true)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <SwipeableDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <div className={classes.list} onClick={() => setDrawerOpen(false)}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>
                  {user && user.name ? user.name.charAt(0).toUpperCase() : 'N'}
                </Avatar>
              }
              title={user.name || 'Nadya User'}
              subheader={`Daftar pada ${dayjs(user.created_at).format(
                'DD MMM YYYY'
              )}`}
            />
            <List>
              <ListItem button onClick={() => navigate('/')}>
                <ListItemText primary='Subscription saya' />
              </ListItem>
              <ListItem button onClick={() => navigate('/onboarding')}>
                <ListItemText primary='Tentang' />
              </ListItem>
              <ListItem button onClick={() => navigate('/setting')}>
                <ListItemText>Pengaturan</ListItemText>
              </ListItem>
              {!appInstalled && (
                <ListItem button onClick={addToHomeScreen}>
                  <ListItemText>Install Aplikasi</ListItemText>
                </ListItem>
              )}
            </List>
            <Typography
              variant='body2'
              color='textSecondary'
              className={classes.appVer}
            >
              App ver: {APP_VER}
            </Typography>
          </div>
        </SwipeableDrawer>
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
          <div className={classes.logoContainer}>
            <img alt='nadya logo' className={classes.logoType} src={LogoType} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
