import is from '@sindresorhus/is'
import { Config } from '../types/main.d'
import validEntity, { validEntities } from './entity'

const validHumans = (config: Config) => {
  if (config && is.object(config)) {
    const { publisher, contributors, credits } = config
    let validHumans: boolean[] = []

    if (!publisher && !contributors && !credits) {
      return false
    }

    if (publisher) {
      validHumans.push(validEntity(publisher))
    }

    if (contributors) {
      validHumans.push(validEntities(contributors))
    }

    if (credits) {
      validHumans.push(validEntities(credits))
    }

    return !validHumans.includes(false)
  } else {
    return false
  }
}

export default validHumans
