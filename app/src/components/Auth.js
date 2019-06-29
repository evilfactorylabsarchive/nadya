import AuthHOC from 'components/AuthHOC'
import { checkLogin } from 'services/user'
import { navigate } from '@reach/router'

/**
 * Authorization logic
 * @return {Object} PromiseObject
 */
const AuthLogic = () =>
  checkLogin()
    .then(user => user._id)
    .catch(_ => {
      navigate('/onboarding')
      return Promise.reject('Unauthorized')
    })

export default AuthHOC(AuthLogic)
