import React from 'react'
import Button from '@material-ui/core/Button'

import { Link } from '@reach/router'

export default () => (
  <>
    <h2>Pick Services</h2>
    <Link to='/pick/spotify'>
      <Button color='primary' variant='outlined'>
        Spotify
      </Button>
    </Link>
  </>
)
