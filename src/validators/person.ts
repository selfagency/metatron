import is from '@sindresorhus/is'
import logger from '../logger'
import Person from '../types/person.d'
import { validEmail, validUrl } from './generics'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const validPerson = (person: Person): [boolean, Error[]] => {
  try {
    if (!is.object(person)) {
      catchErr('`person` must be an object')
    } else {
      const { name, url, role, location, email, social_media } = person

      if (!name) {
        catchErr('`person.name` is required')
      }

      if (url) {
        if (!validUrl(url)) {
          catchErr('`person.url` must be a valid URL')
        }
      } else {
        catchErr('`person.url` is required')
      }

      if (role) {
        if (!is.string(role)) {
          catchErr('`person.role` must be a string')
        }
      }

      if (location) {
        if (!is.string(location)) {
          catchErr('`person.location` must be a string')
        }
      }

      if (email) {
        if (!validEmail(email)) {
          catchErr('`person.email` must be a valid email address')
        }
      }

      if (social_media) {
        if (!is.array(social_media)) {
          catchErr('`person.social_media` must be an array')
        } else {
          social_media.forEach(socialMedia => {
            if (!is.string(socialMedia)) {
              catchErr('`person.social_media` must be an array of strings')
            }

            if (!validUrl(socialMedia)) {
              catchErr('`person.social_media` must contain valid URLs')
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

export default validPerson
