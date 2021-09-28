const generateRobotsTxt = require('../../dist/generators/robots').default
const { readFileSync } = require('atomically')

const output_dir = '/__tests__/__output__'

const robots = {
  sitemap: '/sitemap.xml',
  crawl_delay: 5,
  directives: [
    {
      user_agent: '*',
      allow: ['/'],
      disallow: ['/admin', '/cache']
    },
    {
      user_agent: 'Baiduspider',
      disallow: ['/']
    }
  ]
}

test('generate robots.txt - static', () => {
  const robotsTxt = generateRobotsTxt({
    settings: {
      mode: 'generator',
      output_dir: `.${output_dir}`
    },
    site: {
      name: 'The Self Agency',
      url: 'https://self.agency'
    },
    robots
  })

  const output = readFileSync(`${process.cwd()}${output_dir}/robots.txt`).toString()
  expect(output).toEqual(robotsTxt)
})
