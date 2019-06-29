export function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function toCurrency(number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })
  return formatter.format(number || 0)
}

export function getPeriod(number) {
  // prevent runtime crash while `number` value still undefined
  if (!number) return
  const period = [
    // we use this because our `period` number was started from index 1
    // why not 0? because it will confusing our form validation :))
    { noop: true },
    {
      code: 0,
      label: 'bulan'
    },
    {
      code: 1,
      label: 'tahun'
    }
  ]
  return period[number].label || 'waktu'
}
