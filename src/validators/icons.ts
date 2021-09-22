import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import { Icon } from '../types/pwa.d'
import { validUrl } from './generics'

const validIcons = (icons: Icon[]): boolean => {
  try {
    if (!is.array(icons)) {
      catchErr('icons', false, 'array', icons)
    } else {
      icons.forEach((icon: Icon) => {
        if (!is.object(icon)) {
          catchErr('icons', true, 'array of objects', icon)
        } else {
          const { src, size, type } = icon
          const sizeRegex = new RegExp(/\d{1,4}x\d{1,4}/)

          if (!src || !validUrl(src)) {
            catchErr('icons.src', true, 'path or URL', src)
          }

          if (!size || !is.string(size) || !sizeRegex.test(size)) {
            catchErr('icons.sizes', true, 'string containing a valid size format (eg., `48x48`)', size)
          }

          if (!type || !is.string(type)) {
            catchErr('icons.type', true, 'string containing a valid MIME type (eg., `image/png`', type)
          }
        }
      })
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default validIcons
