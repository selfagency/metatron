import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Settings from '../types/settings.d'
import { validLicense, validPath } from './generics'

const validSettings = (settings: Settings): boolean => {
  const runModes = ['ci', 'generator', 'middleware']

  if (is.object(settings)) {
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

    return !validationErrors.length
  } else {
    catchErr('settings', false, 'object', settings)
    return false
  }
}

export default validSettings
