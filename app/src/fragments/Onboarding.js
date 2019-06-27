import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import MobileStepper from '@material-ui/core/MobileStepper'

import { navigate } from '@reach/router'
import { checkLogin, registerUser } from '../services/user'

import Welcome from '../assets/illustrations/welcome.png'
import Money from '../assets/illustrations/money.png'
import Love from '../assets/illustrations/love.png'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const onBoardingStyle = {
  marginTop: '4rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '500px',
  maxWidth: '100%'
}

export default function FullScreenDialog() {
  const [activeStep, setActiveStep] = React.useState(0)
  const messages = [
    {
      title: 'Welcome to nadya.app',
      description: 'We are on mission to manage your financial, easier',
      image: Welcome
    },
    {
      title: 'We track your digital subscription',
      description: 'In this version 1, we only manage your subscription',
      image: Money
    },
    {
      title: 'You will love it',
      description: "Like what we did. Tell us your feedback if you don't.",
      image: Love
    }
  ]

  function handleNext() {
    if (activeStep < 2) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    } else {
      return checkLogin().then(user => {
        if (!user.total_rows) {
          return registerUser().then(() => navigate('/'))
        }
        navigate('/')
      })
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <div>
      <Dialog fullScreen open TransitionComponent={Transition}>
        <div style={onBoardingStyle}>
          <img
            className='u-w100'
            src={messages[activeStep].image}
            alt={messages[activeStep].title}
          />
          <div className='u-pa1'>
            <h2 className='u-mb1'>{messages[activeStep].title}</h2>
            <p>{messages[activeStep].description}</p>
          </div>
        </div>
        <MobileStepper
          variant='dots'
          steps={3}
          position='bottom'
          activeStep={activeStep}
          nextButton={
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleNext}
            >
              {activeStep === 2 ? 'Use App' : 'Next'}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
          }
        />
      </Dialog>
    </div>
  )
}
