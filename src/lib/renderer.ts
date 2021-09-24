import { readFileSync, writeFileSync } from 'atomically'
import Handlebars from 'handlebars'
import Settings from '../types/settings.d'
import logger from './logger'

const partials = ['entity', 'socialMedia', 'tagline']

partials.forEach(partial => {
  Handlebars.registerPartial(partial, readFileSync(`${process.cwd()}/templates/partials/${partial}.hbs`).toString())
})

const renderTemplate = (txtFile: string, vars: {}, settings: Settings): string | void => {
  try {
    const template = readFileSync(`${process.cwd()}/templates/${txtFile}.hbs`).toString()
    const rendered = Handlebars.compile(template)(vars)

    if (settings.mode !== 'middleware') {
      writeFileSync(`${settings.output_dir || process.cwd()}/${txtFile}.txt`, rendered, {
        fsyncWait: false
      })
    }

    return rendered
  } catch (error) {
    logger.error(error)
  }
}

export default renderTemplate
