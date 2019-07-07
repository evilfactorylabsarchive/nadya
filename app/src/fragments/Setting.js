import React, { Component } from 'react'
import Setting from '../components/Setting'

import { updateUser, getUser, getUserIdFromLS } from '../services/user'

class SettingFragment extends Component {
  state = {
    userId: '',
    userName: '',
    user: {}
  }

  _getUser = userId => {
    getUser(userId)
      .then(user => {
        this.setState({
          user,
          userId,
          userName: user.name
        })
      })
      .catch(err => {
        throw err
      })
  }

  _updateUser = userName => {
    const { userId, user } = this.state
    const payload = {
      _id: userId,
      _rev: user._rev,
      createdAt: user.createdAt,
      name: userName
    }
    return new Promise((resolve, _) => {
      updateUser(payload)
        .then(_ => {
          this._getUser(userId)
          resolve()
        })
        .catch(err => {
          throw err
        })
    })
  }

  componentDidMount() {
    const userId = getUserIdFromLS()
    this._getUser(userId)
  }

  render() {
    return <Setting updateUser={this._updateUser} user={this.state.user} />
  }
}

export default SettingFragment
