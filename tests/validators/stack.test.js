const validStack = require('../../dist/validators/stack.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/lib/errors.js')

test('stack - invalid stack type', () => {
  clearErrors()

  expect(validStack('stack')).toBe(false)
})

test('stack - valid stack.components', () => {
  clearErrors()

  expect(
    validStack({
      components: ['jquery']
    })
  ).toBe(true)
})

test('stack - invalid stack.components', () => {
  clearErrors()

  expect(
    validStack({
      components: [123456]
    })
  ).toBe(false)
})

test('stack - invalid stack.components type', () => {
  clearErrors()

  expect(
    validStack({
      components: 'jquery'
    })
  ).toBe(false)
})

test('stack - valid stack.standards', () => {
  clearErrors()

  expect(
    validStack({
      standards: ['HTML5']
    })
  ).toBe(true)
})

test('stack - invalid stack.standards', () => {
  clearErrors()

  expect(
    validStack({
      standards: [123456]
    })
  ).toBe(false)
})

test('stack - invalid stack.standards type', () => {
  clearErrors()

  expect(
    validStack({
      standards: 'HTML5'
    })
  ).toBe(false)
})

test('stack - valid stack.software', () => {
  clearErrors()

  expect(
    validStack({
      software: ['VS Code']
    })
  ).toBe(true)
})

test('stack - invalid stack.sofware', () => {
  clearErrors()

  expect(
    validStack({
      software: [123456]
    })
  ).toBe(false)
})

test('stack - invalid stack.sofware type', () => {
  clearErrors()

  expect(
    validStack({
      software: 'VS Code'
    })
  ).toBe(false)
})
