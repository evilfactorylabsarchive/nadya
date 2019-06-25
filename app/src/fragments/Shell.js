import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Dialog from 'components/Dialog'
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

export default function Shell() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <div className='App'>
      <header className={classes.content}>
        <p>I'm empty state</p>
      </header>
      <Fab
        onClick={() => setOpen(true)}
        color='primary'
        aria-label='Add'
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} handleClose={() => setOpen(false)} />
    </div>
  )
}
