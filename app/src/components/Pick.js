import React, { useState } from 'react'
import DayjsUtils from '@date-io/dayjs'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import BackIcon from '@material-ui/icons/ArrowBack'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { addSubscription } from '../services/subscription'

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

export default function Pick({
  handleTopLevelClose,
  handleClose,
  activeSubscription
}) {
  const classes = useStyles()
  const [cost, setCost] = useState('')
  const [costInterval, setCostInterval] = useState(0)
  const [startSubscription, setStartSubscription] = useState(new Date())

  const shouldButtonDisabled = () =>
    !cost || !costInterval || !startSubscription

  const handleAddSubscription = () => {
    return addSubscription({
      serviceId: activeSubscription.id,
      title: activeSubscription.title,
      period: costInterval,
      cost: cost
    })
      .then(_ => handleTopLevelClose())
      .catch(err => window.alert(err))
  }

  return (
    <Dialog
      fullScreen
      open
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='Close'
          >
            <BackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Tambahkan {activeSubscription.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Card>
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
