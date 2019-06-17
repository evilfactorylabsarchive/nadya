import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Navbar from './components/Navbar'

import './App.css'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    position: 'fixed',
    bottom: 10,
    right: 10
  },
  content: {
    padding: '2rem'
  }
}))

function App() {
  const classes = useStyles()
  return (
    <div className='App'>
      <Navbar />
      <header className={classes.content}>
        <p>I'm empty state</p>
      </header>
      <Fab color='primary' aria-label='Add' className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default App
