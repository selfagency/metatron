const validTrust = require('../../dist/validators/trust.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/errors.js')

test('trust - invalid trust type', () => {
  clearErrors()

  expect(validTrust('hello')).toBe(false)
})

test('trust - valid affiliation', () => {
  clearErrors()

  expect(
    validTrust({
      affiliation: ['https://example.com']
    })
  ).toBe(true)
})

test('trust - invalid affiliation', () => {
  clearErrors()

  expect(
    validTrust({
      affiliation: ['example.com']
    })
  ).toBe(false)
})

test('trust - invalid affiliation type', () => {
  clearErrors()

  expect(
    validTrust({
      affiliation: 'example.com'
    })
  ).toBe(false)
})

test('trust - valid controlled_by', () => {
  clearErrors()

  expect(
    validTrust({
      controlled_by: 'https://example.com'
    })
  ).toBe(true)
})

test('trust - invalid controlled_by', () => {
  clearErrors()

  expect(
    validTrust({
      controlled_by: ['example.com']
    })
  ).toBe(false)
})

test('trust - valid controls', () => {
  clearErrors()

  expect(
    validTrust({
      controls: ['https://example.com']
    })
  ).toBe(true)
})

test('trust - invalid controls', () => {
  clearErrors()

  expect(
    validTrust({
      controls: ['example.com']
    })
  ).toBe(false)
})

test('trust - invalid controls type', () => {
  clearErrors()

  expect(
    validTrust({
      controls: 'example.com'
    })
  ).toBe(false)
})

test('trust - valid members', () => {
  clearErrors()

  expect(
    validTrust({
      members: ['http://example.com']
    })
  ).toBe(true)
})

test('trust - invalid members', () => {
  clearErrors()

  expect(
    validTrust({
      members: ['example.com']
    })
  ).toBe(false)
})

test('trust - invalid members type', () => {
  clearErrors()

  expect(
    validTrust({
      members: 'http://example.com'
    })
  ).toBe(false)
})
