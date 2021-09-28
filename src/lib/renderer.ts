import { writeFileSync } from 'atomically'
import nunjucks from 'nunjucks'
import Settings from '../types/settings.d'

nunjucks.configure({ autoescape: false })

const renderTemplate = (txtFile: string, vars: {}, settings: Settings): string => {
  // const template = readFileSync().toString()
  const rendered = nunjucks.render(`${process.cwd()}/templates/${txtFile}.njk`, vars)

  if (settings.mode !== 'middleware') {
    writeFileSync(`${settings.output_dir || process.cwd()}/${txtFile}.txt`, rendered, {
      fsyncWait: false
    })
  }

  return rendered
}

export default renderTemplate
