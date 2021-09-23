import Handlebars from 'handlebars'

const renderTemplate = (template: string, vars: {}): string => {
  return Handlebars.compile(template)(vars)
}

export default renderTemplate
