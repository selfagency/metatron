import renderTemplate from '../lib/renderer'
import { Config } from '../types/main.d'
import validAds from '../validators/ads'

const generateAdsTxt = (config: Config): string | void => {
  const { ads, settings } = config

  if (!ads || !validAds(ads)) {
    throw new Error('Missing or invalid `ads.txt` configuration')
  }

  const data = {
    ...ads,
    tagline: settings.tagline || true,
    updated: process.env.NODE_ENV !== 'test' ? new Date().toISOString() : 'date goes here'
  }

  return renderTemplate('ads', data, settings)
}

export default generateAdsTxt
