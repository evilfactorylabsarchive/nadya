import React, { useState, useEffect } from 'react'
import DayjsUtils from '@date-io/dayjs'

import {
  Card,
  CardContent,
  Button,
  CardActions,
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  input: {
    margin: '0.5rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  action: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}))

export default ({ updateSubscription, subscription }) => {
  const classes = useStyles()
  const [serviceName, setServiceName] = useState('')
  const [cost, setCost] = useState('')
  const [costInterval, setCostInterval] = useState(0)
  const [startSubscription, setStartSubscription] = useState(new Date())

  const shouldButtonDisabled = () =>
    !serviceName || !cost || !costInterval || !startSubscription

  const handleUpdateSubscription = () => {
    const payload = {
      serviceName,
      costInterval,
      cost,
      firstBill: startSubscription
    }
    updateSubscription(payload)
  }

  useEffect(() => {
    setServiceName(subscription.title)
    setCost(subscription.cost)
    setCostInterval(subscription.period)
    setStartSubscription(subscription.firstBill)
  }, [subscription])

  return (
    <Card square={true}>
      <CardContent>
        <FormControl fullWidth>
          <TextField
            name='name'
            label='Nama layanan'
            margin='dense'
            variant='outlined'
            value={serviceName || ''}
            disabled={true}
            onChange={e => setServiceName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <TextField
            name='cost'
            type='number'
            label='Biaya'
            margin='dense'
            variant='outlined'
            value={cost || 0}
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
            value={costInterval || 0}
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
            value={startSubscription || new Date()}
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
          onClick={handleUpdateSubscription}
        >
          Simpan
        </Button>
      </CardActions>
    </Card>
  )
}
