import renderTemplate from '../lib/renderer'
import { Config } from '../types/main.d'
import validRobots from '../validators/robots'

const generateRobotsTxt = (config: Config): string | void => {
  const { robots, settings } = config

  if (!robots || !validRobots(robots)) {
    throw new Error('Missing or invalid `robots.txt` configuration')
  }

  const data = {
    ...robots,
    tagline: settings.tagline || true,
    updated: process.env.NODE_ENV !== 'test' ? new Date().toISOString() : 'date goes here'
  }

  return renderTemplate('robots', data, settings)
}

export default generateRobotsTxt
