const {
  validColor,
  validCountry,
  validEmail,
  validHostname,
  validIp,
  validLanguage,
  validLicense,
  validMimeType,
  validPath,
  validUrl
} = require('../../dist/validators/generics.js')
const { validationErrors, errorOutput, clearErrors } = require('../../dist/lib/errors.js')

test('generics - valid color hex', () => {
  clearErrors()

  expect(validColor('#FF0000')).toBe(true)
})

test('generics - invalid color hex', () => {
  clearErrors()

  expect(validColor('#XXYYZZ')).toBe(false)
})

test('generics - valid color string', () => {
  clearErrors()

  expect(validColor('red')).toBe(true)
})

test('generics - invalid color string', () => {
  clearErrors()

  expect(validColor('finalFantasy')).toBe(false)
})

test('generics - invalid color type', () => {
  clearErrors()

  expect(validColor(123456)).toBe(false)
})

test('generics - no color', () => {
  clearErrors()

  expect(validColor()).toBe(false)
})

test('generics - valid country', () => {
  clearErrors()

  expect(validCountry('US')).toBe(true)
})

test('generics - invalid country', () => {
  clearErrors()

  expect(validCountry('XZ')).toBe(false)
})

test('generics - invalid country type', () => {
  clearErrors()

  expect(validCountry(123456)).toBe(false)
})

test('generics - no country', () => {
  clearErrors()

  expect(validCountry()).toBe(false)
})

test('generics - valid country', () => {
  clearErrors()

  expect(validCountry('US')).toBe(true)
})

test('generics - invalid country', () => {
  clearErrors()

  expect(validCountry('XYZ')).toBe(false)
})

test('generics - invalid country type', () => {
  clearErrors()

  expect(validCountry(123456)).toBe(false)
})

test('generics - no country', () => {
  clearErrors()

  expect(validCountry()).toBe(false)
})

test('generics - valid email', () => {
  clearErrors()

  expect(validEmail('hello@test.com')).toBe(true)
})

test('generics - invalid email', () => {
  clearErrors()

  expect(validEmail('hello.com')).toBe(false)
})

test('generics - invalid email type', () => {
  clearErrors()

  expect(validEmail(123456)).toBe(false)
})

test('generics - no email', () => {
  clearErrors()

  expect(validEmail()).toBe(false)
})

test('generics - valid hostname', () => {
  clearErrors()

  expect(validHostname('test.com')).toBe(true)
})

test('generics - invalid hostname', () => {
  clearErrors()

  expect(validHostname('test@hello.com')).toBe(false)
})

test('generics - invalid hostname type', () => {
  clearErrors()

  expect(validHostname(123456)).toBe(false)
})

test('generics - no hostname', () => {
  clearErrors()

  expect(validHostname()).toBe(false)
})

test('generics - valid IP', () => {
  clearErrors()

  expect(validIp('192.168.1.1')).toBe(true)
})

test('generics - invalid IP', () => {
  clearErrors()

  expect(validIp('123.456.789.com')).toBe(false)
})

test('generics - invalid IP type', () => {
  clearErrors()

  expect(validIp(123456)).toBe(false)
})

test('generics - no IP', () => {
  clearErrors()

  expect(validIp()).toBe(false)
})

test('generics - valid language', () => {
  clearErrors()

  expect(validLanguage('en-US')).toBe(true)
})

test('generics - invalid langauge', () => {
  clearErrors()

  expect(validLanguage('es-CZ')).toBe(false)
})

test('generics - invalid langauge type', () => {
  clearErrors()

  expect(validLanguage({})).toBe(false)
})

test('generics - no language', () => {
  clearErrors()

  expect(validLanguage()).toBe(false)
})

test('generics - valid license', () => {
  clearErrors()

  expect(validLicense('MIT')).toBe(true)
})

test('generics - invalid license', () => {
  clearErrors()

  expect(validLicense('NOPE')).toBe(false)
})

test('generics - invalid license type', () => {
  clearErrors()

  expect(validLicense(123456)).toBe(false)
})

test('generics - no license', () => {
  clearErrors()

  expect(validLicense()).toBe(false)
})

test('generics - valid mime type', () => {
  clearErrors()

  expect(validMimeType('image/png')).toBe(true)
})

test('generics - invalid mime typee', () => {
  clearErrors()

  expect(validMimeType('octet/stream')).toBe(false)
})

test('generics - invalid mime type type', () => {
  clearErrors()

  expect(validMimeType(123456)).toBe(false)
})

test('generics - no mime type', () => {
  clearErrors()

  expect(validMimeType()).toBe(false)
})

test('generics - valid path', () => {
  clearErrors()

  expect(validPath('/test')).toBe(true)
})

test('generics - invalid path', () => {
  clearErrors()

  expect(validPath('test')).toBe(false)
})

test('generics - invalid path type', () => {
  clearErrors()

  expect(validPath(123456)).toBe(false)
})

test('generics - no path', () => {
  clearErrors()

  expect(validPath()).toBe(false)
})

test('generics - valid URL', () => {
  clearErrors()

  expect(validUrl('https://hello.com')).toBe(true)
})

test('generics - valid URL with path', () => {
  clearErrors()

  expect(validUrl('https://hello.com/icons/icon.png')).toBe(true)
})

test('generics - invalid URL', () => {
  clearErrors()

  expect(validUrl('xyz://test.nope')).toBe(false)
})

test('generics - invalid URL type', () => {
  clearErrors()

  expect(validUrl(123456)).toBe(false)
})

test('generics - no URL', () => {
  clearErrors()

  expect(validUrl()).toBe(false)
})
