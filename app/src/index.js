import React from 'react'
import Navbar from 'components/Navbar'
import AuthHoc from 'components/Auth'

import Add from 'fragments/Add'
import Pick from 'fragments/Pick'
import Detail from 'fragments/Detail'
import Edit from 'fragments/Edit'
import Shell from 'fragments/Shell'
import Onboarding from 'fragments/Onboarding'
import Setting from 'fragments/Setting'

import { render } from 'react-dom'
import { Router, Location } from '@reach/router'

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
  } else if (path === '/setting') {
    title = 'Pengaturan'
    shouldUseBackIcon = true
  } else if (path !== '/') {
    title = 'Detail'
    shouldUseBackIcon = true
  }
  return <Navbar title={title} shouldUseBackIcon={shouldUseBackIcon} />
}

const ProtectedRoute = ({ Component, ...props }) =>
  AuthHoc(() => <Component {...props} />)

render(
  <>
    <Location>
      {({ location }) => <NavbarWithTitle path={location.pathname} />}
    </Location>
    <Router>
      <Onboarding path='/onboarding' />
      <ProtectedRoute Component={Shell} path='/' />
      <ProtectedRoute Component={Add} path='/pick' />
      <ProtectedRoute Component={Pick} path='/pick/:serviceName' />
      <ProtectedRoute Component={Setting} path='/setting' />
      <ProtectedRoute Component={Detail} path='/:subscriptionId' />
      <ProtectedRoute Component={Edit} path='/:subscriptionId/edit' />
    </Router>
  </>,
  document.getElementById('app')
)

serviceWorker.unregister()
