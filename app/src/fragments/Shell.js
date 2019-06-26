import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AuthHOC from 'components/Auth'

import DialogLazy from '../components/Lazy'

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

export default class App extends Component {
  state = {
    isDialogOpen: false
  }

  _handleDialogOpen = () => {
    this.setState({ isDialogOpen: true })
  }
  _handleDialogClose = () => {
    this.setState({ isDialogOpen: false })
  }
  render() {
    return AuthHOC(() => (
      <div className='App'>
        <header style={classes.content}>
          <p>I'm empty state</p>
        </header>
        <Fab
          onClick={this._handleDialogOpen}
          color='primary'
          aria-label='Add'
          style={classes.fab}
        >
          <AddIcon />
        </Fab>
        <DialogLazy
          component='./Dialog'
          open={this.state.isDialogOpen}
          handleClose={this._handleDialogClose}
        />
      </div>
    ))
  }
}
