import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import SimpleIcons from 'simple-icons-react-component'

import AuthHOC from 'components/Auth'

import DialogLazy from '../components/Lazy'
import {
  listSubscription,
  listenUpdate,
  unlistenUpdate
} from 'services/subscription'

import { navigate } from '@reach/router'
import { toCurrency } from 'utils'

const classes = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20
  },
  content: {
    padding: '2rem'
  },
  container: {
    maxHeight: '90vh',
    overflowY: 'auto'
  }
}

export default class App extends Component {
  state = {
    isDialogOpen: false,
    subscriptions: []
  }

  componentDidMount() {
    listSubscription().then(doc => {
      this.setState({ subscriptions: doc.rows })
    })

    listenUpdate(doc => {
      this.setState({
        subscriptions: [doc, ...this.state.subscriptions]
      })
    })
  }

  _handleDialogOpen = () => {
    this.setState({ isDialogOpen: true })
  }

  _handleDialogClose = () => {
    this.setState({ isDialogOpen: false })
  }

  componentWillUnmount() {
    unlistenUpdate()
  }

  render() {
    return AuthHOC(() => (
      <div className='App'>
        {!this.state.subscriptions.length && (
          <header style={classes.content}>
            <p>I'm empty state</p>
          </header>
        )}
        <div style={classes.container}>
          {this.state.subscriptions
            .filter(({ doc }) => Object.keys(doc).length !== 0)
            .map(({ doc }) => (
              <Card className={classes.card} key={doc._id}>
                <CardActionArea onClick={() => navigate(`/${doc._id}/`)}>
                  <CardHeader
                    avatar={
                      <Avatar
                        style={{ backgroundColor: 'transparent' }}
                        aria-label='Recipe'
                        className={classes.avatar}
                      >
                        <SimpleIcons name={doc.title} />
                      </Avatar>
                    }
                    title={doc.title}
                    subheader={toCurrency(doc.cost)}
                  />
                </CardActionArea>
              </Card>
            ))}
        </div>
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
