import React, { useState, useEffect } from 'react'
import DayjsUtils from '@date-io/dayjs'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { getSubscription, updateSubscription } from 'services/subscription'
import { navigate } from '@reach/router'

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

export default ({ subscription_id }) => {
  const classes = useStyles()
  const [createdAt, setCreatedAt] = useState('')
  const [revId, setRevId] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [cost, setCost] = useState('')
  const [costInterval, setCostInterval] = useState(0)
  const [startSubscription, setStartSubscription] = useState(new Date())

  const shouldButtonDisabled = () =>
    !serviceName || !cost || !costInterval || !startSubscription

  const handleUpdateSubscription = () => {
    const payload = {
      _id: subscription_id,
      _rev: revId,
      title: serviceName,
      period: costInterval,
      createdAt: createdAt,
      cost: cost,
      firstBill: new Date(startSubscription).getTime()
    }
    if (!payload._rev) navigate('/', { replace: true })
    updateSubscription(payload)
      .then(doc => {
        navigate(`/${doc.id}/`, { replace: true })
      })
      .catch(err => {
        throw err
      })
  }

  useEffect(() => {
    getSubscription(subscription_id)
      .then(doc => {
        if (!doc.title) {
          navigate('/', { replace: true })
        }
        setCreatedAt(doc.createdAt)
        setRevId(doc._rev)
        setCost(doc.cost)
        setCostInterval(doc.period)
        setStartSubscription(new Date(doc.firstBill))
        setServiceName(doc.title)
      })
      .catch(err => {
        throw err
      })
  }, [subscription_id])

  return (
    <Card square={true}>
      <CardContent>
        <FormControl fullWidth>
          <TextField
            name='name'
            label='Nama layanan'
            margin='dense'
            variant='outlined'
            value={serviceName}
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
          onClick={handleUpdateSubscription}
        >
          Simpan
        </Button>
      </CardActions>
    </Card>
  )
}
