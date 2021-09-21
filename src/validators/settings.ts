import is from '@sindresorhus/is'
import logger from '../logger'
import Settings from '../types/settings.d'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const runModes = ['generator', 'middleware']

const validSettings = (settings: Settings): [boolean, Error[]] => {
  try {
    if (!is.object(settings)) {
      catchErr('`settings` must be an object')
    } else {
      const { mode, expiry } = settings

      if (mode) {
        if (!is.string(mode) || !runModes.includes(mode)) {
          catchErr('`settings.mode` must be one of: ' + runModes.join(', '))
        }
      }

      if (expiry) {
        if (!is.number(expiry)) {
          catchErr('`settings.expiry` must be a number')
        }
      }
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validSettings
