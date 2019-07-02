import React from 'react'
import Navbar from 'components/Navbar'

import Add from 'fragments/Add'
import Pick from 'fragments/Pick'
import Detail from 'fragments/Detail'
import Edit from 'fragments/Edit'
import Shell from 'fragments/Shell'
import Onboarding from 'fragments/Onboarding'
import Setting from 'fragments/Setting'

import { render } from 'react-dom'
import { Router, Location } from '@reach/router'

import UserContext from 'contexts/UserContext'
import ProtectedRoute from './components/AuthHOC'

import * as serviceWorker from './serviceWorker'

import './App.css'

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
        <Router>
          <Onboarding path='/onboarding' />
          <ProtectedRoute Component={Shell} path='/' />
          <ProtectedRoute Component={Add} path='/pick' />
          <ProtectedRoute Component={Pick} path='/pick/:serviceName' />
          <ProtectedRoute Component={Setting} path='/setting' />
          <ProtectedRoute Component={Detail} path='/:subscriptionId' />
          <ProtectedRoute Component={Edit} path='/:subscriptionId/edit' />
        </Router>
      </UserContext.Provider>
    )
  }
}

render(<App />, document.getElementById('app'))

serviceWorker.register()
