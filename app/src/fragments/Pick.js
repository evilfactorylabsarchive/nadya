import React, { useState, useEffect } from 'react'
import DayjsUtils from '@date-io/dayjs'
import BackIcon from '@material-ui/icons/ArrowBack'

import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CardActions,
  CardContent,
  Button,
  Card,
  Slide,
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { navigate } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles'
import { addSubscription } from 'services/subscription'

import Subscriptions from '../assets/data.json'
import { getUserIdFromLS } from 'services/user.js'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='left' ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  input: {
    margin: '0.5rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  action: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}))

export default ({ serviceName }) => {
  const classes = useStyles()
  const [activeSubscription, setActiveSubscription] = useState({})
  const [cost, setCost] = useState('')
  const [costInterval, setCostInterval] = useState(0)
  const [startSubscription, setStartSubscription] = useState(new Date())

  useEffect(() => {
    const serviceId = serviceName.split('-')[0]
    if (Subscriptions[serviceId]) {
      setActiveSubscription(Subscriptions[serviceId])
    } else {
      navigate('/pick/', { replace: true })
    }
  }, [serviceName])

  const shouldButtonDisabled = () =>
    !cost || !costInterval || !startSubscription

  const handleAddSubscription = () => {
    addSubscription({
      serviceId: activeSubscription.id,
      title: activeSubscription.title,
      period: costInterval,
      cost: cost,
      owner: getUserIdFromLS(),
      firstBill: startSubscription
    })
      .then(_ => navigate('/'))
      .catch(err => window.alert(err))
  }

  return (
    <Dialog fullScreen open TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => navigate('/pick/')}
            aria-label='Close'
          >
            <BackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Tambahkan {activeSubscription.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Card square={true}>
        <CardContent>
          <FormControl fullWidth margin='normal'>
            <TextField
              name='cost'
              type='number'
              label='Biaya'
              margin='dense'
              variant='outlined'
              value={cost}
              onChange={e => setCost(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Rp </InputAdornment>
                )
              }}
            />
          </FormControl>
          <FormControl variant='outlined' fullWidth margin='dense'>
            <InputLabel variant='outlined'>Periode penagihan</InputLabel>
            <Select
              value={costInterval}
              onChange={e => setCostInterval(e.target.value)}
              input={<OutlinedInput labelWidth={150} margin='none' />}
            >
              <MenuItem value={1}>Bulanan</MenuItem>
              <MenuItem value={2}>Tahunan</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <DatePicker
              fullWidth
              margin='normal'
              label='Tanggal pertama berlangganan'
              inputVariant='outlined'
              value={startSubscription}
              onChange={setStartSubscription}
            />
          </MuiPickersUtilsProvider>
        </CardContent>
        <CardActions>
          <Button
            className={classes.action}
            color='primary'
            variant='contained'
            disabled={shouldButtonDisabled()}
            onClick={handleAddSubscription}
          >
            Simpan
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}
