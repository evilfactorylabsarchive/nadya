import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { Link } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles'

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
      <header className={classes.content}>
        <p>I'm empty state</p>
      </header>
      <Link to='/pick'>
        <Fab color='primary' aria-label='Add' className={classes.fab}>
          <AddIcon />
        </Fab>
      </Link>
    </div>
  )
}

export default App
