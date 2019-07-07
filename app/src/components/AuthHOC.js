import React, { useContext, useEffect } from 'react'

import UserContext from 'contexts/UserContext'
import Onboarding from 'fragments/Onboarding'

import { USER_ID_FROM_LS } from '../constants'
import { getUserIdFromLS, checkLogin } from 'services/user'

export default ({ Component, ...props }) => {
  const { setUserId, userId } = useContext(UserContext)

  useEffect(() => {
    const getUserId = getUserIdFromLS()
    if (getUserId) {
      setUserId(getUserId)
    } else {
      checkLogin().then(userDoc => {
        if (userDoc) {
          setUserId(userDoc[0]._id)
          localStorage.setItem(USER_ID_FROM_LS, userDoc[0]._id)
        }
      })
    }
  }, [setUserId])

  return userId ? <Component {...props} /> : <Onboarding />
}
