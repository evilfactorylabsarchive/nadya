import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'
import 'jest-dom/extend-expect'

/*
 * @todo
 * set global in lint like prettier or bable
 */
global.React = React
global.render = render
global.cleanup = cleanup
global.fireEvent = fireEvent
global.waitForElement = waitForElement
