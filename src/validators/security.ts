import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import Security from '../types/security.d'
import { validEmail, validPath, validUrl } from './generics'

const validSecurity = (security: Security): boolean => {
  try {
    if (!is.object(security)) {
      catchErr('security', false, 'object', security)
    } else {
      const { policy, contact, public_key } = security

      if (policy && !validUrl(policy)) {
        catchErr('security.policy', false, 'URL', policy)
      }

      if (contact && !validUrl(contact) && !validEmail(contact)) {
        catchErr('security.contact', true, 'email or URL', contact)
      }

      if (public_key && !validPath(public_key) && !validUrl(public_key)) {
        catchErr('security.public_key', false, 'path or URL', public_key)
      }
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default validSecurity
