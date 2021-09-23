import { readFileSync, writeFileSync } from 'atomically'
import renderTemplate from '../lib/renderer'
import { Config } from '../types/main.d'

const generateAdsTxt = (config: Config): string | void => {
  const { ads, settings } = config

  const template = readFileSync(`${process.cwd()}/templates/ads.hbs`).toString()
  const rendered = renderTemplate(template, { ...ads, tagline: settings.tagline || true })

  if (settings && settings.mode && settings.mode === 'ci') {
    writeFileSync(`${settings.output_dir || process.cwd()}/ads.txt`, rendered, {
      fsyncWait: false
    })
  } else {
    return rendered
  }
}

export default generateAdsTxt
