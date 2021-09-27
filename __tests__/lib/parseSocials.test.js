const parseSocials = require('../../dist/lib/parseSocials.js').default

test('valid parseSocials', () => {
  const socials = [
    'https://facebook.com/profile',
    'https://twitter.com/profile',
    'https://linkedin.com/in/profile'
  ]

  expect(parseSocials(socials)).toMatchSnapshot()
})

test('invalid parseSocials', () => {
  const socials = 'socials'

  expect(() => parseSocials(socials)).toThrow()
})

test('invalid parseSocials', () => {
  const socials = [
    'facebook.com/profile',
    'twitter.com/profile',
    'linkedin.com/in/profile'
  ]

  expect(() => parseSocials(socials)).toThrow()
})
