import Button from '@material-ui/core/Button'
import React from 'react'

import { navigate } from '@reach/router'

export default () => (
  <>
    <h2>Add Spotify</h2>
    <Button onClick={() => navigate('/')} variant='contained' color='primary'>
      Save
    </Button>
  </>
)
