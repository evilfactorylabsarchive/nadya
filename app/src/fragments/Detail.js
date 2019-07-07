import React, { Component } from 'react'
import Detail from 'components/Detail'

import { navigate } from '@reach/router'
import { getSubscription, deleteSubscription } from 'services/subscription'

class DetailFragment extends Component {
  state = {
    subscriptionId: this.props.subscriptionId,
    subscription: {}
  }

  componentDidMount() {
    getSubscription(this.state.subscriptionId)
      .then(subscription => {
        this.setState({ subscription })
      })
      .catch(_ => navigate('/', { replace: true }))
  }

  _deleteSubscription = () => {
    deleteSubscription(this.state.subscriptionId)
      .then(() => {
        navigate('/', { replace: true })
      })
      .catch(err => {
        throw err
      })
  }

  render() {
    return (
      <Detail
        handleDelete={this._deleteSubscription}
        subscription={this.state.subscription}
      />
    )
  }
}

export default DetailFragment
