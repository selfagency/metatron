import is from '@sindresorhus/is'
import { Config } from '../types/main.d'
import validEntity, { validEntities } from './entity'

const validHumans = (config: Config) => {
  if (config && is.object(config) && (config.publisher || config.authors || config.credits)) {
    const { publisher, authors, credits } = config
    let validHumans: boolean[] = []

    if ((publisher && validEntity(publisher)) || !publisher) {
      validHumans.push(true)
    } else {
      validHumans.push(false)
    }

    if ((authors && validEntities(authors)) || !authors) {
      validHumans.push(true)
    } else {
      validHumans.push(false)
    }

    if ((credits && validEntities(credits)) || !credits) {
      validHumans.push(true)
    } else {
      validHumans.push(false)
    }

    return !validHumans.includes(false)
  } else {
    return false
  }
}

export default validHumans
