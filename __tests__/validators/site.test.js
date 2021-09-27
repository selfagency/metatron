const validSite = require('../../dist/validators/site.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/lib/errors.js')

test('site - invalid type', () => {
  clearErrors()

  expect(validSite('string')).toBe(false)
})

test('site - valid site', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com'
    })
  ).toBe(true)
})

test('site - invalid site.name', () => {
  clearErrors()

  expect(
    validSite({
      name: null,
      url: 'https://example.com'
    })
  ).toBe(false)
})

test('site - invalid site.url', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'example.com'
    })
  ).toBe(false)
})

test('site - no site.url', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: null
    })
  ).toBe(false)
})

test('site - valid site.description', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      description: 'test'
    })
  ).toBe(true)
})

test('site - invalid site.description', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      description: 123456
    })
  ).toBe(false)
})

test('site - valid site.logo', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png'
    })
  ).toBe(true)
})

test('site - invalid site.logo', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      logo: 123456
    })
  ).toBe(false)
})

test('site - valid site.default_image', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      default_image: 'http://example.com/image.png'
    })
  ).toBe(true)
})

test('site - invalid site.default_image', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      default_image: 123456
    })
  ).toBe(false)
})

test('site - valid site.contact (email)', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      contact: 'hello@goodbye.com'
    })
  ).toBe(true)
})

test('site - valid site.contact (URL)', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      contact: 'http://example.com/contact'
    })
  ).toBe(true)
})

test('site - valid site.contact (URI)', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      contact: 'tel:123456789'
    })
  ).toBe(true)
})

test('site - invalid site.contact', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      contact: 123456
    })
  ).toBe(false)
})

test('site - valid site.country', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      country: 'ZA'
    })
  ).toBe(true)
})

test('site - invalid site.country', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      country: 'XY'
    })
  ).toBe(false)
})

test('site - invalid site.country.type', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      country: 123456
    })
  ).toBe(false)
})

test('site - valid site.doctype', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      doctype: 'HTML5'
    })
  ).toBe(true)
})

test('site - invalid site.doctype', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      doctype: 'CSS'
    })
  ).toBe(false)
})

test('site - valid site.languages', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      languages: ['EN', 'HE']
    })
  ).toBe(true)
})

test('site - invalid site.languages', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      languages: ['XY']
    })
  ).toBe(false)
})

test('site - invalid site.languages', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      languages: 'EN'
    })
  ).toBe(false)
})

test('site - valid site.social_media', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      social_media: ['https://facebook.com']
    })
  ).toBe(true)
})

test('site - invalid site.social_media', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      social_media: ['httpl://facebook.com']
    })
  ).toBe(false)
})

test('site - invalid site.social_media type', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      social_media: 123456
    })
  ).toBe(false)
})

test('site - valid site.social_media', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      feeds: {
        rss: 'https://example.com/feed'
      }
    })
  ).toBe(true)
})

test('site - invalid site.feeds', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      feeds: {
        rss: 'hello'
      }
    })
  ).toBe(false)
})

test('site - invalid site.feeds', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      feeds: {
        json: 123456
      }
    })
  ).toBe(false)
})

test('site - invalid site.feeds', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      feeds: {
        atom: 'hello'
      }
    })
  ).toBe(false)
})

test('site - no site.feeds', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      feeds: {}
    })
  ).toBe(false)
})

test('site - invalid site.feeds type', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      feeds: 123456
    })
  ).toBe(false)
})

test('site - valid site.privacy_policy', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      privacy_policy: 'https://example.com/privacy'
    })
  ).toBe(true)
})

test('site - invalid site.privacy_policy', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      privacy_policy: 'string'
    })
  ).toBe(false)
})

test('site - valid site.acceptable_use_policy', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      acceptable_use_policy: 'https://example.com/aup'
    })
  ).toBe(true)
})

test('site - invalid site.acceptable_use_policy', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      acceptable_use_policy: 'string'
    })
  ).toBe(false)
})

test('site - valid site.terms_of_service', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      terms_of_service: 'https://example.com/tos'
    })
  ).toBe(true)
})

test('site - invalid site.terms_of_service', () => {
  clearErrors()

  expect(
    validSite({
      name: 'name',
      url: 'https://example.com',
      terms_of_service: 'string'
    })
  ).toBe(false)
})
