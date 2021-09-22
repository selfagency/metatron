import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Settings from '../types/settings.d'
import { validLicense, validPath } from './generics'

const runModes = ['ci', 'generator', 'middleware']

const validSettings = (settings: Settings): boolean => {
  if (!is.object(settings)) {
    catchErr('settings', false, 'object', settings)
    return false
  }

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
}

export default validSettings
