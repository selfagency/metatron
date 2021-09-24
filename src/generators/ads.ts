import renderTemplate from '../lib/renderer'
import { Config } from '../types/main.d'

const generateAdsTxt = (config: Config): string | void => {
  const { ads, settings } = config
  return renderTemplate('ads', { ...ads, tagline: settings.tagline || true }, settings)
}

export default generateAdsTxt
