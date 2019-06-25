import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { Link, navigate } from '@reach/router'
import { checkLogin } from '../services/user'

const classes = {
  fab: {
    position: 'fixed',
    bottom: 10,
    right: 10
  },
  content: {
    padding: '2rem'
  }
}

class App extends Component {
  componentDidMount() {
    // FIXME(@108kb): delete this validation
    // after @ri7nz create HoC
    checkLogin()
      .then(user => {
        console.log(user)
      })
      .catch(_ => {
        // TODO(@108kb): Redirect to 4xx/5xx route
        navigate('/onboarding')
      })
  }
  render() {
    return (
      <div className='App'>
        <header style={classes.content}>
          <Link to='/pick'>
            <Fab color='primary' aria-label='Add' style={classes.fab}>
              <AddIcon />
            </Fab>
          </Link>
        </header>
      </div>
    )
  }
}

export default App
