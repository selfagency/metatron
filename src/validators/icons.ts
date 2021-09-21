import is from '@sindresorhus/is'
import logger from '../logger'
import { Icon } from '../types/pwa.d'
import { validUrl } from './generics'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const validIcons = (icons: Icon[]): [boolean, Error[]] => {
  try {
    if (!is.array(icons)) {
      throw new Error('`pwa.appearance.icons` must be an array')
    }

    icons.forEach((icon: Icon) => {
      if (typeof icon !== 'object') {
        throw new Error('`pwa.appearance.icons` must be an array of objects')
      }

      const { src, size, type } = icon

      if (!src) {
        catchErr('`pwa.appearance.icons` must have a `src` property')
      }

      if (!validUrl(src)) {
        catchErr('`pwa.appearance.icons.src` must be a valid path or URL')
      }

      if (size) {
        if (!is.string(size)) {
          throw new Error('`pwa.appearance.icons.sizes` must be a string')
        }

        const sizeRegex = new RegExp(/\d{1,4}x\d{1,4}/)
        if (!sizeRegex.test(size)) {
          catchErr('`pwa.appearance.icons.size` must be a valid size format (eg., `48x48`)')
        }
      }

      if (type) {
        if (!is.string(type)) {
          throw new Error('`pwa.appearance.icons.type` must be a string')
        }

        if (type.length > 48) {
          catchErr('`pwa.appearance.icons.type` must be less than 48 characters')
        }
      }
    })

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validIcons
