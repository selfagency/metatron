const validHumans = require('../../dist/validators/humans.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/lib/errors.js')

test('humans - valid humans', () => {
  clearErrors()

  expect(
    validHumans({
      publisher: {
        name: 'John Doe',
        url: 'http://example.com'
      },
      contributors: [
        {
          name: 'John Doe',
          url: 'http://example.com'
        },
        {
          name: 'John Doe',
          url: 'http://example.com'
        }
      ],
      credits: [
        {
          name: 'John Doe',
          url: 'http://example.com'
        },
        {
          name: 'John Doe',
          url: 'http://example.com'
        }
      ]
    })
  ).toBe(true)
})

test('humans - invalid humans', () => {
  clearErrors()

  expect(
    validHumans([
      {
        name: 'John Doe'
      },
      {
        url: 'http://example.com'
      }
    ])
  ).toBe(false)
})

test('humans - invalid publisher', () => {
  clearErrors()

  expect(
    validHumans({
      publisher: {
        name: 'John Doe'
      }
    })
  ).toBe(false)
})

test('humans - invalid author', () => {
  clearErrors()

  expect(
    validHumans({
      contributors: [
        {
          name: 'John Doe'
        }
      ]
    })
  ).toBe(false)
})

test('humans - invalid credit', () => {
  clearErrors()

  expect(
    validHumans({
      credits: [
        {
          name: 'John Doe'
        }
      ]
    })
  ).toBe(false)
})

test('humans - no humans', () => {
  clearErrors()

  expect(validHumans()).toBe(false)
})
