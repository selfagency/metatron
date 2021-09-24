import renderTemplate from '../lib/renderer'
import { Config } from '../types/main.d'

const generateHumansTxt = (config: Config): string | void => {
  const { publisher, contributors, credits, site, stack, settings } = config

  return renderTemplate(
    'humans',
    {
      publisher,
      contributors,
      credits,
      stack: {
        components: stack?.components?.join(', '),
        standards: stack?.standards?.join(', '),
        devtools: stack?.devtools?.join(', ')
      },
      site: {
        updated: new Date().toISOString(),
        doctype: site.doctype,
        languages: site?.languages?.join(', ')
      },
      tagline: settings.tagline || true
    },
    settings
  )
}

export default generateHumansTxt
