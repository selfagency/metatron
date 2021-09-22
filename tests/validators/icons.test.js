const validIcons = require('../../dist/validators/icons.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/errors.js')

test('icons - valid icons (path)', () => {
  clearErrors()

  expect(
    validIcons([
      {
        src: './static/icons/icon_48x48.png',
        size: '48x48',
        type: 'image/png'
      }
    ])
  ).toBe(true)
})

test('icons - valid icons (URL)', () => {
  clearErrors()

  expect(
    validIcons([
      {
        src: 'https://mysite.com/icons/icon_48x48.png',
        size: '48x48',
        type: 'image/png'
      }
    ])
  ).toBe(true)
})

test('icons - invalid icons', () => {
  clearErrors()

  expect(
    validIcons([
      {
        src: './static/icons/icon_72x72.png'
      }
    ])
  ).toBe(false)
})

test('icons - invalid icon path', () => {
  clearErrors()

  expect(
    validIcons([
      {
        src: 'static/icons/icon_72x72.png',
        size: '72',
        type: 'image/png'
      }
    ])
  ).toBe(false)
})

test('icons - invalid icon URL', () => {
  clearErrors()

  expect(
    validIcons([
      {
        src: 'htp://test.com/myicon.png',
        size: '72',
        type: 'image/png'
      }
    ])
  ).toBe(false)
})

test('icons - invalid icon size', () => {
  clearErrors()

  expect(
    validIcons([
      {
        src: './static/icons/icon_72x72.png',
        size: '72',
        type: 'image/png'
      }
    ])
  ).toBe(false)
})

test('icons - invalid MIME type', () => {
  clearErrors()

  expect(
    validIcons([
      {
        src: './static/icons/icon_72x72.png',
        size: '72',
        type: 12345
      }
    ])
  ).toBe(false)
})

test('icons - invalid icons type', () => {
  clearErrors()

  expect(validIcons(['hello'])).toBe(false)
})

test('icons - no icons', () => {
  clearErrors()

  expect(validIcons()).toBe(false)
})
