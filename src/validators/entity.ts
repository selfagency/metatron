import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import Entity from '../types/entity.d'
import { validEmail, validUrl } from './generics'

const validEntities = (entities: Entity[]): boolean => {
  try {
    if (!is.array(entities)) {
      catchErr('authors` and/or `credits', false, 'array', entities)
    } else {
      entities.forEach(entity => {
        validEntity(entity)
      })
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

const validEntity = (entity: Entity): boolean => {
  try {
    if (!is.object(entity)) {
      catchErr('entity', false, 'object', entity)
    } else {
      const { name, url, role, location, email, social_media } = entity

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

      if (email && !validEmail(email)) {
        catchErr('entity.email', false, 'email', email)
      }

      if (social_media) {
        if (!is.array(social_media)) {
          catchErr('entity.social_media', false, 'array', social_media)
        } else {
          social_media.forEach(socialMedia => {
            if (!validUrl(socialMedia)) {
              catchErr('entity.social_media', false, 'URLs', socialMedia)
            }
          })
        }
      }
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default validEntity
export { validEntities }
