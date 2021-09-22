const validAds = require('../../dist/validators/ads.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/errors.js')

test('ads - no object', () => {
  clearErrors()

  expect(validAds('ads')).toBe(false)
})

test('ads - empty object', () => {
  clearErrors()

  expect(validAds({})).toBe(false)
})

test('ads - no contact', () => {
  clearErrors()

  expect(
    validAds({
      sellers: [
        {
          domain: 'test.com',
          publisher_id: 'abcd1234',
          account_type: 'DIRECT'
        }
      ]
    })
  ).toBe(false)
})

test('ads - bad contact', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'hello',
      sellers: [
        {
          domain: 'test.com',
          publisher_id: 'abcd1234',
          account_type: 'DIRECT'
        }
      ]
    })
  ).toBe(false)
})

test('ads - no sellers array', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com'
    })
  ).toBe(false)
})

test('ads - bad sellers array 1', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: 'test'
    })
  ).toBe(false)
})

test('ads - bad sellers array 2', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: ['test']
    })
  ).toBe(false)
})

test('ads - bad seller domain', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER'
        }
      ]
    })
  ).toBe(false)
})

test('ads - bad seller publisher_id', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 12345,
          account_type: 'RESELLER'
        }
      ]
    })
  ).toBe(false)
})

test('ads - bad seller account_type', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'DESELLER'
        }
      ]
    })
  ).toBe(false)
})

test('ads - bad seller cert_auth_id', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER',
          cert_auth_id: 12345
        }
      ]
    })
  ).toBe(false)
})

test('ads - bad seller comment', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER',
          comment: 12345
        }
      ]
    })
  ).toBe(false)
})

test('ads - no inventory partners array', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER'
        }
      ],
      inventory_partners: 'hello'
    })
  ).toBe(false)
})

test('ads - bad inventory partners array', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER'
        }
      ],
      inventory_partners: ['hello']
    })
  ).toBe(false)
})

test('ads - no subdomain array', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER'
        }
      ],
      subdomains: 'hello'
    })
  ).toBe(false)
})

test('ads - bad subdomain array', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER'
        }
      ],
      subdomains: ['hello']
    })
  ).toBe(false)
})

test('ads - fully loaded', () => {
  clearErrors()

  expect(
    validAds({
      contact: 'adops@test.com',
      sellers: [
        {
          domain: 'test.com',
          publisher_id: 'abcd1234',
          account_type: 'DIRECT'
        },
        {
          domain: 'hello.com',
          publisher_id: 'xyz9871',
          account_type: 'RESELLER',
          cert_auth_id: 'zyx7891'
        }
      ],
      subdomains: ['my.test.com']
    })
  ).toBe(true)
})
