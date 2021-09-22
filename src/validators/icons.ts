import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import { Icon } from '../types/pwa.d'
import { validMimeType, validPath, validUrl } from './generics'

const validIcons = (icons: Icon[]): boolean => {
  if (!is.array(icons)) {
    catchErr('icons', false, 'array', icons)
  } else {
    icons.forEach((icon: Icon) => {
      if (!is.object(icon)) {
        catchErr('icons', true, 'array of objects', icon)
      } else {
        const { src, size, type } = icon
        const sizeRegex = new RegExp(/\d{1,4}x\d{1,4}/)

        if (!src || (src && !validPath(src) && !validUrl(src))) {
          catchErr('icons.src', true, 'path or URL', src)
        }

        if (!size || !is.string(size) || !sizeRegex.test(size)) {
          catchErr('icons.sizes', true, 'valid size format (eg., `48x48`)', size)
        }

        if (!type || !validMimeType(type)) {
          catchErr('icons.type', true, 'MIME type (eg., `image/png`', type)
        }
      }
    })
  }

  return !validationErrors.length
}

export default validIcons
