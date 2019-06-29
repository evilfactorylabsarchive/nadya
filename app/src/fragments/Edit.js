import React, { Component } from 'react'
import Edit from 'components/Edit'

import { navigate } from '@reach/router'
import { getSubscription, updateSubscription } from 'services/subscription'
import { getUserIdFromLS } from 'services/user'

class EditFragment extends Component {
  state = {
    subscriptionId: this.props.subscriptionId,
    subscription: {}
  }

  _updateSubscription = payload => {
    updateSubscription({
      _id: this.state.subscription._id,
      _rev: this.state.subscription._rev,
      createdAt: this.state.subscription.createdAt,
      title: payload.serviceName,
      period: payload.costInterval,
      cost: payload.cost,
      owner: getUserIdFromLS(),
      updatedAt: Date.now(),
      firstBill: new Date(payload.firstBill).getTime()
    })
      .then(subscription => {
        navigate(`/${subscription.id}/`, { replace: true })
      })
      .catch(err => {
        throw err
      })
  }

  componentDidMount() {
    getSubscription(this.state.subscriptionId)
      .then(subscription => {
        this.setState({ subscription })
      })
      .catch(_ => navigate('/', { replace: true }))
  }

  render() {
    return (
      <Edit
        updateSubscription={this._updateSubscription}
        subscription={this.state.subscription}
      />
    )
  }
}

export default EditFragment
