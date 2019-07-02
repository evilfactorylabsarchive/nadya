import React, { Suspense, lazy } from 'react'
import Navbar from 'components/Navbar'

import { render } from 'react-dom'
import { Router, Location } from '@reach/router'
import { Loading } from 'components/Lazy'

import UserContext from 'contexts/UserContext'
import ProtectedRoute from './components/AuthHOC'

import * as serviceWorker from './serviceWorker'

import './App.css'

const Add = lazy(() => import('./fragments/Add'))
const Pick = lazy(() => import('./fragments/Pick'))
const Detail = lazy(() => import('./fragments/Detail'))
const Edit = lazy(() => import('./fragments/Edit'))
const Shell = lazy(() => import('./fragments/Shell'))
const Onboarding = lazy(() => import('./fragments/Onboarding'))
const Setting = lazy(() => import('./fragments/Setting'))

class App extends React.Component {
  state = {
    userId: null,
    setUserId: userId => {
      this.setState({ userId })
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.state.userId && (
          <Location>
            {({ location }) => <Navbar path={location.pathname} />}
          </Location>
        )}
        <Suspense fallback={<Loading />}>
          <Router>
            <Onboarding path='/onboarding' />
            <ProtectedRoute Component={Shell} path='/' />
            <ProtectedRoute Component={Add} path='/pick' />
            <ProtectedRoute Component={Pick} path='/pick/:serviceName' />
            <ProtectedRoute Component={Setting} path='/setting' />
            <ProtectedRoute Component={Detail} path='/:subscriptionId' />
            <ProtectedRoute Component={Edit} path='/:subscriptionId/edit' />
          </Router>
        </Suspense>
      </UserContext.Provider>
    )
  }
}

render(<App />, document.getElementById('app'))

serviceWorker.register()
