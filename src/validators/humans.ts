import Entity from '../types/entity.d'
import validEntity, { validEntities } from './entity'

const validHumans = (publisher?: Entity, authors?: Entity[], credits?: Entity[]) => {
  if (publisher || authors || credits) {
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
}

export default validHumans
