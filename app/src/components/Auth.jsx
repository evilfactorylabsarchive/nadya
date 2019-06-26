// src/components/Auth.jsx
import AuthHOC from './AuthHOC'
import { checkLogin } from 'services/user'
// import { navigate } from '@reach/router'

/**
 * Authorization logic
 * @return {Object} PromiseObject
 */
const AuthLogic = () =>
  checkLogin()
    .then(user => {
      return Object.keys(user).length
    })
    .catch(err => {
      // FIXME: this approach just to make sure our test pass
      throw err
      // navigate('/onboarding')
    })

export default AuthHOC(AuthLogic)
