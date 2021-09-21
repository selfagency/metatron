import is from '@sindresorhus/is'
import logger from '../logger'
import Trust from '../types/trust.d'
import { validUrl } from './generics'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const validTrust = (trust: Trust): [boolean, Error[]] => {
  try {
    if (!is.object(trust)) {
      catchErr('`trust` must be an object')
    } else {
      const { affiliation, controlled_by, controls, members } = trust

      if (affiliation) {
        if (!is.array(affiliation)) {
          catchErr('`trust.affiliation` must be an array')
        } else {
          affiliation.forEach(affiliate => {
            if (!validUrl(affiliate)) {
              catchErr('`trust.affiliation` must contain valid URLs')
            }
          })
        }
      }

      if (controlled_by) {
        if (!validUrl(controlled_by)) {
          catchErr('`trust.controlled_by` must be a valid URL')
        }
      }

      if (controls) {
        if (!is.array(controls)) {
          catchErr('`controls` must be an array')
        } else {
          controls.forEach(control => {
            if (!validUrl(control)) {
              catchErr('`trust.controls` must contain valid URLs')
            }
          })
        }
      }

      if (members) {
        if (!is.array(members)) {
          catchErr('`members` must be an array')
        } else {
          members.forEach(member => {
            if (!validUrl(member)) {
              catchErr('`trust.members` must contain valid URLs')
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

export default validTrust
