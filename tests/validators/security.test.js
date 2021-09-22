const validSecurity = require('../../dist/validators/security.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/errors.js')

test('security - valid security', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: 'me@hello.com'
    })
  ).toBe(true)
})

test('security - valid security.contact (URL)', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: 'https://example.com'
    })
  ).toBe(true)
})

test('security - valid security.contact (URI)', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: 'tel:123456789'
    })
  ).toBe(true)
})

test('security - invalid security.contact', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: null
    })
  ).toBe(false)
})

test('security - valid security.reporting_policy', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: 'mailto:hello@me.com',
      reporting_policy: 'https://example.com/security'
    })
  ).toBe(true)
})

test('security - invalid security.reporting_policy', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: 'mailto:hello@me.com',
      reporting_policy: 'httpl://example.com/security'
    })
  ).toBe(false)
})

test('security - valid security.public_key', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: 'mailto:hello@me.com',
      public_key: 'https://example.com/key.pub'
    })
  ).toBe(true)
})

test('security - invalid security.public_key', () => {
  clearErrors()

  expect(
    validSecurity({
      contact: 'mailto:hello@me.com',
      public_key: 'httpl://example.com/key.pub'
    })
  ).toBe(false)
})

test('security - invalid security', () => {
  clearErrors()

  expect(validSecurity({})).toBe(false)
})

test('security - invalid security type', () => {
  clearErrors()

  expect(validSecurity('hola')).toBe(false)
})
