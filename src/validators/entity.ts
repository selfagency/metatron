import is from '@sindresorhus/is'
import logger from '../logger'
import Entity from '../types/entity.d'
import { validEmail, validUrl } from './generics'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const validEntities = (entities: Entity[]): [boolean, Error[]] => {
  try {
    if (!is.array(entities)) {
      catchErr('`authors` and/or `credits` must be an array')
    } else {
      entities.forEach(entity => {
        const [isValid, errors] = validEntity(entity)
        if (!isValid) {
          validationErrors.push(...errors)
        }
      })
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

const validEntity = (Entity: Entity): [boolean, Error[]] => {
  try {
    if (!is.object(Entity)) {
      catchErr('`Entity` must be an object')
    } else {
      const { name, url, role, location, email, social_media } = Entity

      if (!name) {
        catchErr('`Entity.name` is required')
      }

      if (url) {
        if (!validUrl(url)) {
          catchErr('`Entity.url` must be a valid URL')
        }
      } else {
        catchErr('`Entity.url` is required')
      }

      if (role) {
        if (!is.string(role)) {
          catchErr('`Entity.role` must be a string')
        }
      }

      if (location) {
        if (!is.string(location)) {
          catchErr('`Entity.location` must be a string')
        }
      }

      if (email) {
        if (!validEmail(email)) {
          catchErr('`Entity.email` must be a valid email address')
        }
      }

      if (social_media) {
        if (!is.array(social_media)) {
          catchErr('`Entity.social_media` must be an array')
        } else {
          social_media.forEach(socialMedia => {
            if (!is.string(socialMedia)) {
              catchErr('`Entity.social_media` must be an array of strings')
            }

            if (!validUrl(socialMedia)) {
              catchErr('`Entity.social_media` must contain valid URLs')
            }
          })
        }
      }
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validEntity
export { validEntities }
