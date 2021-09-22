import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import Settings from '../types/settings.d'
import { validPath } from './generics'
import validLicense from './license'

const validSettings = (settings: Settings): boolean => {
  try {
    const runModes = ['ci', 'middleware']

    if (!is.object(settings)) {
      catchErr('settings', false, 'object', settings)
    } else {
      const { mode, expiry, license, output_dir, favicon } = settings

      if (mode && (!is.string(mode) || !runModes.includes(mode))) {
        catchErr('settings.mode', false, 'one of: ' + runModes.join(', '), mode)
      }

      if (expiry && !is.number(expiry)) {
        catchErr('settings.expiry', false, 'number', expiry)
      }

      if (license && !validLicense(license)) {
        catchErr('settings.license', false, 'license identifier', license)
      }

      if (output_dir && !validPath(output_dir)) {
        catchErr('settings.output_dir', false, 'path', output_dir)
      }
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default validSettings
