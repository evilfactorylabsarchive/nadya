/*
 * @todo we can remove React and render if you define
 * as global in src/setupTests.js  and eslint or prettier.
 */
import React from 'react'
import { render } from '@testing-library/react'
import AuthHOC from './AuthHOC'

describe('Test AuthHOC', () => {
  test('Render Component if Valid Authorization', () => {
    const AuthLogic = () => true
    const ChildElement = 'Authorization Component'
    const ChildComponent = () => <div>{ChildElement}</div>
    const AuthWrapper = AuthHOC(AuthLogic)
    const { getByText } = render(AuthWrapper(ChildComponent))
    // assertation
    expect(getByText(ChildElement)).toBeInTheDocument()
  })

  test('Returned Null if invalid Authorization', () => {
    const AuthLogic = () => false
    const AuthWrapper = AuthHOC(AuthLogic)
    // assertation
    expect(AuthWrapper(() => '')).toBeNull()
  })
})
