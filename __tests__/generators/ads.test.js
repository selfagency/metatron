const generateAds = require('../../dist/generators/ads').default
const { readFileSync } = require('atomically')

const ads = {
  sellers: [
    {
      domain: 'example.com',
      publisher_id: 'abc1234',
      account_type: 'DIRECT'
    },
    {
      domain: 'example.com',
      publisher_id: 'abc1234',
      account_type: 'DIRECT',
      cert_auth_id: '1234abc'
    },
    {
      domain: 'example.com',
      publisher_id: 'abc1234',
      account_type: 'DIRECT',
      comment: 'this is a comment'
    }
  ],
  inventory_partners: ['example.com', 'test.com'],
  subdomains: ['ads.example.com', 'ads.test.com'],
  contact: 'adops@example.com'
}

test('generate ads.txt - static', () => {
  const adsTxt = generateAds({
    site: {
      languages: ['en']
    },
    settings: {
      mode: 'generator',
      output_dir: './__tests__/__output__'
    },
    ads
  })

  const output = readFileSync(`${process.cwd()}/__tests__/__output__/ads.txt`).toString()
  expect(output).toEqual(adsTxt)
})

test('generate ads.txt - middleware', () => {
  const adsTxt = generateAds({
    site: {
      languages: ['en']
    },
    settings: {
      mode: 'middleware'
    },
    ads
  })

  expect(adsTxt).toMatchSnapshot()
})

test('generate ads.txt - missing', () => {
  expect(() =>
    generateAds({
      settings: {
        mode: 'middleware'
      }
    })
  ).toThrow()
})

test('generate ads.txt - invalid', () => {
  expect(() =>
    generateAds({
      settings: {
        mode: 'middleware'
      },
      ads: [
        {
          domain: 'example.com'
        }
      ]
    })
  ).toThrow()
})
