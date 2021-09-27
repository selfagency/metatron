import renderTemplate from '../lib/renderer'
import { Config } from '../types/main.d'
import validHumans from '../validators/humans'

const generateHumansTxt = (config: Config): string => {
  if (!validHumans(config)) {
    throw new Error('Missing or invalid `humans.txt` configuration')
  }

  const { publisher, contributors, credits, site, stack, settings } = config
  const data = {
    publisher,
    contributors,
    credits,
    stack: {
      components: stack?.components,
      standards: stack?.standards,
      devtools: stack?.devtools
    },
    site: {
      doctype: site?.doctype,
      languages: site?.languages
    },
    tagline: settings.tagline || true,
    updated: process.env.NODE_ENV !== 'test' ? new Date().toISOString() : 'date goes here'
  }

  return renderTemplate('humans', data, settings)
}

export default generateHumansTxt
