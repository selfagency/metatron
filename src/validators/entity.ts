import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Entity from '../types/entity.d'
import { validEmail, validUri, validUrl } from './generics'

const validEntities = (entities: Entity[]): boolean => {
  if (!is.array(entities) || !entities.length) {
    catchErr('entities', false, 'array', entities)
  } else {
    entities.forEach(entity => {
      validEntity(entity)
    })
  }

  return !validationErrors.length
}

const validEntity = (entity: Entity): boolean => {
  if (!is.object(entity)) {
    catchErr('entity', false, 'object', entity)
    return false
  }

  const { name, url, role, location, contact, social_media } = entity

  if (!name || !is.string(name)) {
    catchErr('entity.name', true, 'string', name)
  }

  if (!url || !validUrl(url)) {
    catchErr('entity.url', true, 'URL', url)
  }

  if (role && !is.string(role)) {
    catchErr('entity.role', false, 'string', role)
  }

  if (location && !is.string(location)) {
    catchErr('entity.location', false, 'string', location)
  }

  if (contact && !validEmail(contact) && !validUrl(contact) && !validUri(contact)) {
    catchErr('entity.contact', false, 'contact', contact)
  }

  if (social_media) {
    if (!is.array(social_media)) {
      catchErr('entity.social_media', false, 'array', social_media)
    } else {
      social_media.forEach(socialMedia => {
        if (!validUrl(socialMedia)) {
          catchErr('entity.social_media', true, 'URL', socialMedia)
        }
      })
    }
  }

  return !validationErrors.length
}

export default validEntity
export { validEntities }
