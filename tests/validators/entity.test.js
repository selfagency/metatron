const validEntity = require('../../dist/validators/entity.js').default
const { validEntities } = require('../../dist/validators/entity.js')
const { validationErrors, errorOutput, clearErrors } = require('../../dist/errors.js')

test('entity - valid entities', () => {
  clearErrors()

  expect(
    validEntities([
      {
        name: 'John Doe',
        url: 'http://example.com'
      },
      {
        name: 'John Doe',
        url: 'http://example.com'
      }
    ])
  ).toBe(true)
})

test('entity - invalid entities', () => {
  clearErrors()

  expect(
    validEntities([
      {
        url: 'http://example.com'
      },
      {
        name: 'John Doe'
      }
    ])
  ).toBe(false)
})

test('entity - no entities', () => {
  clearErrors()

  expect(validEntities([])).toBe(false)
})

test('entity - valid entity', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com'
    })
  ).toBe(true)
})

test('entity - invalid entity', () => {
  clearErrors()

  expect(validEntity({})).toBe(false)
})

test('entity - invalid entity type', () => {
  clearErrors()

  expect(validEntity(123456)).toBe(false)
})

test('entity - valid entity role', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      role: 'Editor'
    })
  ).toBe(true)
})

test('entity - invalid entity role', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      role: 123456
    })
  ).toBe(false)
})

test('entity - valid entity location', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      location: 'New York, NY, USA'
    })
  ).toBe(true)
})

test('entity - invalid entity location', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      location: 123456
    })
  ).toBe(false)
})

test('entity - valid entity email', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      email: 'hello@test.com'
    })
  ).toBe(true)
})

test('entity - invalid entity email', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      email: 'arf'
    })
  ).toBe(false)
})

test('entity - valid entity social_media', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      social_media: ['https://facebook.com/whatever', 'https://twitter.com/whatever']
    })
  ).toBe(true)
})

test('entity - invalid entity social_media', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      social_media: ['frogs']
    })
  ).toBe(false)
})

test('entity - invalid entity social_media type', () => {
  clearErrors()

  expect(
    validEntity({
      name: 'John Doe',
      url: 'http://example.com',
      social_media: 'frogs'
    })
  ).toBe(false)
})

test('entity - no entity', () => {
  clearErrors()

  expect(validEntity()).toBe(false)
})
