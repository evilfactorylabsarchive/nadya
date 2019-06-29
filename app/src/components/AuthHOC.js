import React from 'react'

/**
 * @description A Basic AUTH HOC
 * @param {Function} AuthLogic
 * @return {Function|ReactComponent|null}
 */
export default function AuthHOC(AuthLogic) {
  return function AuthComponent(Component) {
    return AuthLogic() ? <Component /> : null
  }
}
