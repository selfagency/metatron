const validRobots = require('../../dist/validators/robots.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/lib/errors.js')

test('robots - valid robots', () => {
  clearErrors()

  expect(
    validRobots({
      sitemap: 'https://example.com/sitemap.xml',
      crawl_delay: 60,
      directives: [
        {
          user_agent: '*',
          allow: ['/'],
          disallow: ['/admin/*']
        },
        {
          user_agent: 'Baiduspider',
          disallow: ['/']
        }
      ]
    })
  ).toBe(true)
})

test('invalid robots', () => {
  clearErrors()

  expect(validRobots({})).toBe(false)
})

test('robots - invalid robots type', () => {
  clearErrors()

  expect(validRobots('hello')).toBe(false)
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

test('robots - valid robots.directives', () => {
  clearErrors()

  expect(
    validRobots({
      directives: [
        {
          user_agent: '*',
          allow: ['/*'],
          disallow: ['/admin/*']
        }
      ]
    })
  ).toBe(true)
})

test('robots - invalid robots.directives.allow type', () => {
  clearErrors()

  expect(
    validRobots({
      directives: [
        {
          user_agent: '*',
          allow: ['snarf']
        }
      ]
    })
  ).toBe(false)
})

test('robots - invalid robots.directives.disallow type', () => {
  clearErrors()

  expect(
    validRobots({
      directives: [
        {
          user_agent: '*',
          disallow: ['snarf']
        }
      ]
    })
  ).toBe(false)
})

test('robots - invalid robots.directives.user_agent', () => {
  clearErrors()

  expect(
    validRobots({
      directives: [
        {
          user_agent: null,
          allow: ['/*'],
          disallow: ['/admin/*']
        }
      ]
    })
  ).toBe(false)
})

test('robots - invalid robots.directives', () => {
  clearErrors()

  expect(
    validRobots({
      directives: [{}]
    })
  ).toBe(false)
})

test('robots - invalid robots.directives type', () => {
  clearErrors()

  expect(validRobots({ directives: {} })).toBe(false)
})

test('robots - invalid robots.directives.directive type', () => {
  clearErrors()

  expect(validRobots({ directives: [12345] })).toBe(false)
})

test('robots - invalid robots.directives.directive.allow type', () => {
  clearErrors()

  expect(validRobots({ directives: [{ allow: '*' }] })).toBe(false)
})

test('robots - invalid robots.directives.directive.disallow type', () => {
  clearErrors()

  expect(validRobots({ directives: [{ disallow: '*' }] })).toBe(false)
})

test('robots - invalid robots.directives.directive.allow/disallow type', () => {
  clearErrors()

  expect(validRobots({ directives: [{ allow: '/', disallow: '/admin' }] })).toBe(false)
})
