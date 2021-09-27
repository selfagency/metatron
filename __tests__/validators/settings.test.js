const validSettings = require('../../dist/validators/settings.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/lib/errors.js')

test('settings - valid mode', () => {
  clearErrors()

  expect(
    validSettings({
      mode: 'ci'
    })
  ).toBe(true)
})

test('settings - invalid mode', () => {
  clearErrors()

  expect(
    validSettings({
      mode: 'cli'
    })
  ).toBe(false)
})

test('settings - valid expiry', () => {
  clearErrors()

  expect(
    validSettings({
      expiry: 7
    })
  ).toBe(true)
})

test('settings - invalid expiry', () => {
  clearErrors()

  expect(
    validSettings({
      expiry: 'one'
    })
  ).toBe(false)
})

test('settings - valid license', () => {
  clearErrors()

  expect(
    validSettings({
      license: 'MIT'
    })
  ).toBe(true)
})

test('settings - invalid license', () => {
  clearErrors()

  expect(
    validSettings({
      license: 'MIT-LICENSE'
    })
  ).toBe(false)
})

test('settings - valid output_dir', () => {
  clearErrors()

  expect(
    validSettings({
      output_dir: './dist'
    })
  ).toBe(true)
})

test('settings - invalid output_dir', () => {
  clearErrors()

  expect(
    validSettings({
      output_dir: 'dist/'
    })
  ).toBe(false)
})

test('settings - valid favicon', () => {
  clearErrors()

  expect(
    validSettings({
      favicon: true
    })
  ).toBe(true)
})

test('settings - no favicon', () => {
  clearErrors()

  expect(
    validSettings({
      favicon: false
    })
  ).toBe(true)
})

test('settings - invalid favicon', () => {
  clearErrors()

  expect(
    validSettings({
      favicon: 'true'
    })
  ).toBe(false)
})

test('settings - invalid settings type', () => {
  expect(validSettings('ci')).toBe(false)
})
