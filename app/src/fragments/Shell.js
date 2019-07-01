import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import SimpleIcons from 'simple-icons-react-component'

import { navigate } from '@reach/router'
import { toCurrency } from 'utils'
import { listSubscription } from 'services/subscription'

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
    subscriptions: []
  }

  _navigate = subscriptionId => {
    navigate(`/${subscriptionId}/`)
  }

  componentDidMount() {
    listSubscription()
      .then(docs => {
        this.setState({ subscriptions: docs })
      })
      .catch(err => {
        throw err
      })
  }

  render() {
    return (
      <div className='App'>
        {!this.state.subscriptions.length && (
          <header style={classes.content}>
            <p>I'm empty state</p>
          </header>
        )}
        <div style={classes.container}>
          {this.state.subscriptions.map(doc => (
            <Card style={classes.card} key={doc._id} square={true}>
              <CardActionArea onClick={this._navigate.bind(this, doc._id)}>
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
          onClick={this._navigate.bind(this, 'pick')}
          color='primary'
          style={classes.fab}
        >
          <AddIcon />
        </Fab>
      </div>
    )
  }
}
