import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import Settings from '../types/settings.d'

const validSettings = (settings: Settings): boolean => {
  try {
    const runModes = ['generator', 'middleware']

    if (!is.object(settings)) {
      catchErr('settings', false, 'object', settings)
    } else {
      const { mode, expiry } = settings

      if (mode && (!is.string(mode) || !runModes.includes(mode))) {
        catchErr('settings.mode', false, 'one of: ' + runModes.join(', '), mode)
      }

      if (expiry && !is.number(expiry)) {
        catchErr('settings.expiry', false, 'number', expiry)
      }
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default validSettings
