const generateHumansTxt = require('../../dist/generators/humans').default
const { readFileSync } = require('atomically')

const humans = {
  site: {
    name: 'The Self Agency',
    languages: ['en', 'yi']
  },
  publisher: {
    name: 'The Self Agency',
    contact: 'hello@self.agency',
    url: 'https://self.agency',
    social_media: ['https://www.facebook.com/selfagency', 'https://www.instagram.com/selfagency']
  },
  contributors: [
    {
      name: 'Daniel Sieradski',
      role: 'Admin',
      contact: 'hello@self.agency',
      url: 'https://sieradski.co',
      social_media: ['https://www.facebook.com/selfagency', 'https://www.instagram.com/selfagency']
    },
    {
      name: 'Jane Doe',
      role: 'Editor',
      contact: 'hello@self.agency',
      url: 'https://example.com'
    }
  ],
  credits: [
    {
      name: 'Ribono Shel Olam',
      role: 'Master of the Universe',
      contact: 'https://shemayim.org/contact',
      url: 'https://shemayim.org'
    },
    {
      name: 'Shel Silverstein',
      role: 'Master of the Page',
      url: 'https://shelsilverstein.com'
    }
  ],
  stack: {
    components: ['typescript', 'nunjucks'],
    standards: ['n/a'],
    devtools: ['vscode']
  }
}

test('generate humans.txt - static', () => {
  const humansTxt = generateHumansTxt({
    ...humans,
    settings: {
      mode: 'generator',
      output_dir: './__tests__/__output__',
      tagline: true
    }
  })

  const output = readFileSync(`${process.cwd()}/__tests__/__output__/humans.txt`).toString()
  expect(output).toEqual(humansTxt)
})

test('generate humans.txt - middleware', () => {
  const humansTxt = generateHumansTxt({
    ...humans,
    settings: {
      mode: 'middleware',
      tagline: false
    }
  })

  expect(humansTxt).toMatchSnapshot()
})

test('generate humans.txt - missing', () => {
  expect(() =>
    generateHumansTxt({
      settings: {
        mode: 'middleware'
      }
    })
  ).toThrow()
})

test('generate humans.txt - invalid', () => {
  expect(() =>
    generateHumansTxt({
      settings: {
        mode: 'middleware'
      },
      humans: {
        publisher: {
          name: 'John Doe'
        }
      }
    }).toThrow()
  )
})
