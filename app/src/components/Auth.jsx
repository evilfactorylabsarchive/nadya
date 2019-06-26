// src/components/Auth.jsx
import AuthHOC from './AuthHOC'
import { checkLogin } from 'services/user'
import { navigate } from '@reach/router'

/**
 * Authorization logic
 * @return {Object} PromiseObject
 */
const AuthLogic = () =>
  checkLogin()
    .then(user => {
      console.log(user)
    })
    .catch(_ => {
      navigate('/onboarding')
    })

export default AuthHOC(AuthLogic)
