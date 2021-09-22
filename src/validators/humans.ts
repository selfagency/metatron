import { Config } from '../types/main.d'
import validEntity, { validEntities } from './entity'

const validHumans = (config: Config) => {
  const { publisher, authors, credits } = config
  let validHumans: boolean[] = []

  if ((publisher && validEntity(publisher)) || !publisher) {
    validHumans.push(true)
  }

  if ((authors && validEntities(authors)) || !authors) {
    validHumans.push(true)
  }

  if ((credits && validEntities(credits)) || !credits) {
    validHumans.push(true)
  }

  return !validHumans.includes(false)
}

export default validHumans
