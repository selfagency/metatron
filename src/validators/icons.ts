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
      catchErr('`icons` must be an array')
    } else {
      icons.forEach((icon: Icon) => {
        if (!is.object(icon)) {
          catchErr('`icons` must be an array of objects')
        } else {
          const { src, size, type } = icon

          if (!src) {
            catchErr('`icons` must have a `src` property')
          }

          if (!validUrl(src)) {
            catchErr('`icons.src` must be a valid path or URL')
          }

          if (size) {
            if (!is.string(size)) {
              catchErr('`icons.sizes` must be a string')
            }

            const sizeRegex = new RegExp(/\d{1,4}x\d{1,4}/)
            if (!sizeRegex.test(size)) {
              catchErr('`icons.size` must be a valid size format (eg., `48x48`)')
            }
          }

          if (type) {
            if (!is.string(type)) {
              catchErr('`icons.type` must be a string')
            }

            if (type.length > 48) {
              catchErr('`icons.type` must be less than 48 characters')
            }
          }
        }
      })
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validIcons
