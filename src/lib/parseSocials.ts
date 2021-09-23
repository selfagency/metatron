import is from '@sindresorhus/is'
import { Url } from '../types/generics'
import { validUri, validUrl } from '../validators/generics'

const parseSocials = (socials: Url[]) => {
  if (!is.array(socials)) {
    throw new Error('parseSocials(socials) invalid array')
  }

  socials.forEach(url => {
    if (!validUrl(url) && !validUri(url)) {
      throw new Error('parseSocials(socials) invalid entry')
    }
  })

  return socials.map(url => {
    return {
      service: url.split('://')[1].split('.')[0],
      url
    }
  })
}

export default parseSocials
