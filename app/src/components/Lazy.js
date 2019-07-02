import React, { Suspense } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

export function Loading() {
  return (
    <LinearProgress
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      }}
    />
  )
}

export default function Lazy({ component, ...props }) {
  const Lazy = React.lazy(() => import(`${component}`))
  return (
    <Suspense fallback={<Loading />}>
      <Lazy {...props} />
    </Suspense>
  )
}
