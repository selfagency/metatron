import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../lib/errors'
import Security from '../types/security.d'
import { validEmail, validPath, validUri, validUrl } from './generics'

const validSecurity = (security: Security): boolean => {
  if (!is.object(security)) {
    catchErr('security', false, 'object', security)
    return false
  }

  const { reporting_policy, contact, public_key } = security

  if (!contact || (!validUrl(contact) && !validUri(contact) && !validEmail(contact))) {
    catchErr('security.contact', true, 'email or URL', contact)
  }

  if (reporting_policy && !validUrl(reporting_policy)) {
    catchErr('security.reporting_policy', false, 'URL', reporting_policy)
  }

  if (public_key && !validPath(public_key) && !validUrl(public_key)) {
    catchErr('security.public_key', false, 'path or URL', public_key)
  }

  return !validationErrors.length
}

export default validSecurity
