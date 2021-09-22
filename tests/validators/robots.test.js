const validRobots = require('../../dist/validators/robots.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/lib/errors.js')

test('robots - valid robots', () => {
  clearErrors()

  expect(
    validRobots({
      sitemap: 'https://example.com/sitemap.xml',
      crawl_delay: 60,
      allow: [
        {
          user_agent: '*',
          paths: ['/*']
        }
      ],
      disallow: [
        {
          user_agent: '*',
          paths: ['/admin/*']
        }
      ]
    })
  ).toBe(true)
})

test('robots - valid robots.sitemap', () => {
  clearErrors()

  expect(
    validRobots({
      sitemap: '/sitemap.xml'
    })
  ).toBe(true)
})

test('robots - invalid robots.sitemap', () => {
  clearErrors()

  expect(
    validRobots({
      sitemap: 'example.com/sitemap.xml'
    })
  ).toBe(false)
})

test('robots - valid robots.crawl_delay', () => {
  clearErrors()

  expect(
    validRobots({
      crawl_delay: 60
    })
  ).toBe(true)
})

test('robots - invalid robots.crawl_delay', () => {
  clearErrors()

  expect(
    validRobots({
      crawl_delay: 'five'
    })
  ).toBe(false)
})

test('robots - valid robots.directive', () => {
  clearErrors()

  expect(
    validRobots({
      allow: [
        {
          user_agent: '*',
          paths: ['/*']
        }
      ]
    })
  ).toBe(true)
})

test('robots - invalid robots.directive', () => {
  clearErrors()

  expect(
    validRobots({
      allow: ['snarf']
    })
  ).toBe(false)
})

test('robots - invalid robots.directive type', () => {
  clearErrors()

  expect(
    validRobots({
      disallow: 'snarf'
    })
  ).toBe(false)
})

test('robots - invalid robots.directive.user_agent', () => {
  clearErrors()

  expect(
    validRobots({
      allow: [
        {
          user_agent: null,
          paths: ['/*']
        }
      ]
    })
  ).toBe(false)
})

test('robots - valid robots.directive.paths', () => {
  clearErrors()

  expect(
    validRobots({
      allow: [
        {
          user_agent: '*',
          paths: ['/*']
        }
      ]
    })
  ).toBe(true)
})

test('robots - invalid robots.directive.paths', () => {
  clearErrors()

  expect(
    validRobots({
      allow: [
        {
          user_agent: '*',
          paths: '/*'
        }
      ]
    })
  ).toBe(false)
})

test('robots - invalid robots.directive.paths.path', () => {
  clearErrors()

  expect(
    validRobots({
      allow: [
        {
          user_agent: '*',
          paths: ['arf']
        }
      ]
    })
  ).toBe(false)
})

test('robots - invalid robots.directive type', () => {
  clearErrors()

  expect(validRobots({ allow: 'hola' })).toBe(false)
})

test('robots - invalid robots type', () => {
  clearErrors()

  expect(validRobots('hello')).toBe(false)
})
