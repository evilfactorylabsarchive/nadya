import { handleNotFound } from 'services/helpers'

it('should mark as 404 not found', () => {
  expect(handleNotFound({ status: 404 })).toEqual(0)
})

it('should throw random error', () => {
  expect(() => {
    handleNotFound({ status: 666 })
  }).toThrowError()
})
