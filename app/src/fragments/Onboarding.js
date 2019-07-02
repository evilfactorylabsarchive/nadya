import React, { useState } from 'react'
import { navigate } from '@reach/router'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  MobileStepper
} from '@material-ui/core'
import { checkLogin, registerUser } from '../services/user'

import UserContext from 'contexts/UserContext'

import Welcome from 'assets/illustrations/welcome.png'
import Money from 'assets/illustrations/money.png'
import Love from 'assets/illustrations/love.png'
import { createNotification } from 'services/notification'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const AlertDialog = ({ isDialogOpen, handleClose, handleAllow }) => (
  <div>
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>Izinkan Notifikasi</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Kami membutuhkan izin kamu untuk bisa mengirimkan notifikasi
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAllow}>Izinkan</Button>
      </DialogActions>
    </Dialog>
  </div>
)

const onBoardingStyle = {
  marginTop: '4rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '500px',
  maxWidth: '100%'
}

export default function FullScreenDialog() {
  const userContext = React.useContext(UserContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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

  function handleAllow() {
    if ('Notification' in window) {
      if (Notification.permission !== 'denied') {
        return Notification.requestPermission()
          .then(() => {
            registerUser()
              .then(user => {
                userContext.setUserId(user.id)
                createNotification({
                  title: 'Terima Kasih!',
                  message:
                    'Notifikasi seputar subscriptionmu akan muncul disini'
                })
                navigate('/')
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            window.alert('please atuh :(')
          })
      }
    }
  }

  function handleNext() {
    if (activeStep < 2) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    } else {
      checkLogin()
        .then(() => navigate('/'))
        .catch(() => {
          setIsDialogOpen(true)
          return
        })
    }
  }

  const handleClose = () => {
    setIsDialogOpen(false)
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
      <AlertDialog
        isDialogOpen={isDialogOpen}
        handleClose={handleClose}
        handleAllow={handleAllow}
      />
    </div>
  )
}
