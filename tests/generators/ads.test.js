const generateAds = require('../../dist/generators/ads').default

test('generate ads.txt - static', () => {
  const adsTxt = generateAds({
    settings: {
      mode: 'generator',
      output_dir: './'
    },
    ads: {
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
  })

  expect(adsTxt).toMatchSnapshot()
})

// test('generate ads.txt - middleware', () => {})
