import React, { Component, memo } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import SimpleIcons from 'simple-icons-react-component'

import { navigate } from '@reach/router'
import { toCurrency, getPeriod } from 'utils'
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
    maxHeight: '77.7vh',
    overflowY: 'auto'
  },
  total: {
    marginTop: '0.6rem',
    marginBottom: '0.3rem'
  }
}

const TotalSubscriptions = memo(({ handleClick, total, periodFilter }) => {
  return (
    <CardContent onClick={handleClick}>
      <h2 style={classes.total}>Total Pengeluaran</h2>
      <p>
        {toCurrency(total)}/{getPeriod(periodFilter)}
      </p>
    </CardContent>
  )
})

export default class App extends Component {
  state = {
    subscriptions: [],
    periodFilter: 1, // monthly. 2 for annual
    totalBill: 0
  }

  _navigate = subscriptionId => {
    navigate(`/${subscriptionId}/`)
  }

  _handleClick = () => {
    // TODO: handle sum when user click "Total Pengeluaran" here
    const nextPeriod = this.state.periodFilter === 1 ? 2 : 1
    const totalBill = this.state.subscriptions.reduce(this._calculateSum, 0)

    this.setState({
      periodFilter: nextPeriod,
      totalBill: totalBill
    })
  }

  _calculateSum = (acc, current) => {
    if (this.state.periodFilter === 1) {
      return (
        ~~acc + (current.period === 2 ? ~~current.cost / 12 : ~~current.cost)
      )
    } else if (this.state.periodFilter === 2) {
      return (
        ~~acc + (current.period === 1 ? ~~current.cost * 12 : ~~current.cost)
      )
    }
  }

  componentDidMount() {
    listSubscription()
      .then(docs => {
        setTimeout(() => {
          const totalBill = docs.reduce(this._calculateSum, 0)
          this.setState({ totalBill })
        })
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
                  subheader={`${toCurrency(doc.cost)}/${getPeriod(doc.period)}`}
                />
              </CardActionArea>
            </Card>
          ))}
        </div>
        {this.state.subscriptions.length ? (
          <TotalSubscriptions
            periodFilter={this.state.periodFilter}
            total={this.state.totalBill}
          />
        ) : null}
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
