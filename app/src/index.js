import React from 'react'
import Navbar from './components/Navbar'

import { render } from 'react-dom'
import { Router, Location } from '@reach/router'
import { Detail, Edit, Shell, Onboarding } from './fragments'

import * as serviceWorker from './serviceWorker'

import './App.css'

const NavbarWithTitle = ({ path }) => {
  // TODO: create better solution for his
  // maybe using Context or something similar
  let title = undefined
  let shouldUseBackIcon = false
  if (path.includes('edit')) {
    title = 'Edit Subscription'
    shouldUseBackIcon = true
  } else if (path !== '/') {
    title = 'Detail'
    shouldUseBackIcon = true
  }
  return <Navbar title={title} shouldUseBackIcon={shouldUseBackIcon} />
}

render(
  <>
    <Location>
      {({ location }) => <NavbarWithTitle path={location.pathname} />}
    </Location>
    <Router>
      <Shell path='/' />
      <Onboarding path='/onboarding' />
      <Detail path='/:subscription_id' />
      <Edit path='/:subscription_id/edit' />
    </Router>
  </>,
  document.getElementById('app')
)

serviceWorker.unregister()
