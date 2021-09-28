const generateLicenseTxt = require('../../dist/generators/license').default
const { readFileSync } = require('atomically')

const output_dir = '/__tests__/__output__'

const license = {
  publisher: {
    name: 'The Self Agency',
    contact: 'hello@self.agency',
    url: 'https://self.agency'
  },
  settings: {
    license: 'MIT',
    update: 'date goes here'
  }
}

test('generate license.txt - static', () => {
  const licenseTxt = generateLicenseTxt({
    ...license,
    settings: {
      ...license.settings,
      mode: 'generator',
      output_dir: `.${output_dir}`,
      tagline: true
    }
  })

  const output = readFileSync(`${process.cwd()}${output_dir}/license.txt`).toString()
  expect(output).toEqual(licenseTxt)
})

test('generate license.txt - middleware', () => {
  const licenseTxt = generateLicenseTxt({
    ...license,
    settings: {
      ...license.settings,
      mode: 'middleware',
      tagline: false
    }
  })

  expect(licenseTxt).toMatchSnapshot()
})

test('generate license.txt - missing', () => {
  expect(() =>
    generateLicenseTxt({
      settings: {
        ...license.settings,
        mode: 'middleware'
      }
    })
  ).toThrow()
})

test('generate license.txt - invalid', () => {
  expect(() =>
    generateLicenseTxt({
      settings: {
        ...license.settings,
        mode: 'middleware'
      },
      license: {
        publisher: {
          name: 'John Doe'
        }
      }
    }).toThrow()
  )
})
