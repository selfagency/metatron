import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Trust from '../types/trust.d'
import { validUrl } from './generics'

const validTrust = (trust: Trust): boolean => {
  if (is.object(trust)) {
    const { affiliation, controlled_by, controls, members } = trust

    if (affiliation) {
      if (!is.array(affiliation)) {
        catchErr('trust.affiliation', true, 'array', affiliation)
      } else {
        affiliation.forEach(affiliate => {
          if (!validUrl(affiliate)) {
            catchErr('trust.affiliation', true, 'URL', affiliate)
          }
        })
      }
    }

    if (controlled_by && !validUrl(controlled_by)) {
      catchErr('trust.controlled_by', true, 'URL', controlled_by)
    }

    if (controls) {
      if (!is.array(controls)) {
        catchErr('controls', true, 'array', controls)
      } else {
        controls.forEach(control => {
          if (!validUrl(control)) {
            catchErr('trust.controls', true, 'URL', control)
          }
        })
      }
    }

    if (members) {
      if (!is.array(members)) {
        catchErr('members', true, 'array', members)
      } else {
        members.forEach(member => {
          if (!validUrl(member)) {
            catchErr('trust.members', true, 'URL', member)
          }
        })
      }
    }

    return !validationErrors.length
  } else {
    catchErr('trust', false, 'object', trust)
    return false
  }
}

export default validTrust
