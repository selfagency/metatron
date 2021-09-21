import is from '@sindresorhus/is'
import logger from '../logger'
import Pwa from '../types/pwa.d'
import { validColor, validPath, validUrl } from './generics'
import validIcons from './icons'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const directions = ['auto', 'ltr', 'rtl']
const displayModes = ['fullscreen', 'standalone', 'minimal-ui', 'browser']
const orientations = [
  'any',
  'natural',
  'landscape',
  'landscape-primary',
  'landscape-secondary',
  'portrait',
  'portrait-primary',
  'portrait-secondary'
]
const appPlatforms = ['play', 'itunes']

const validatePwa = (pwa: Pwa): [boolean, Error[]] => {
  try {
    if (typeof pwa !== 'object') {
      throw new Error('`pwa` must be an object')
    }

    const {
      short_name,
      categories,
      start_url,
      scope,
      appearance,
      shortcuts,
      related_apps,
      prefer_related_apps,
      iarc_rating_id,
      screenshots
    } = pwa

    if (short_name) {
      if (!is.string(pwa.short_name)) {
        catchErr('`pwa.short_name` must be a string')
      }

      if (short_name.length > 48) {
        catchErr('short_name must be less than 48 characters')
      }
    } else {
      catchErr('`pwa.short_name` is required')
    }

    if (categories) {
      if (!is.array(categories)) {
        catchErr('`pwa.categories` must be an array')
      }

      categories.forEach((category: string) => {
        if (!is.string(category)) {
          catchErr('`pwa.categories` must be an array of strings')
        }

        if (category.length > 48) {
          catchErr('`pwa.categories` must be less than 48 characters')
        }
      })
    }

    if (start_url) {
      if (!validUrl || !validPath) {
        catchErr('`pwa.start_url` must be a valid path or URL')
      }
    } else {
      catchErr('`pwa.start_url` is required')
    }

    if (scope) {
      if (!validUrl || !validPath) {
        catchErr('`pwa.scope` must be a valid path or URL')
      }
    }

    if (appearance) {
      if (typeof appearance !== 'object') {
        throw new Error('`pwa.appearance` must be an object')
      }

      const { display_mode, background_color, theme_color, orientation, text_direction, icons } = appearance

      if (display_mode) {
        if (!is.string(display_mode) || !displayModes.includes(display_mode)) {
          catchErr('`pwa.appearance.display_mode` must be one of: ' + displayModes.join(', '))
        }
      }

      if (background_color) {
        if (!is.string(background_color) || !validColor(background_color)) {
          catchErr('`pwa.appearance.background_color` must be a valid HTML color')
        }
      }

      if (theme_color) {
        if (!is.string(theme_color) || !validColor(theme_color)) {
          catchErr('`pwa.appearance.theme_color` must be a valid HTML color')
        }
      }

      if (orientation) {
        if (!is.string(orientation) || !orientations.includes(orientation)) {
          catchErr('`pwa.appearance.orientation` must be one of: ' + orientations.join(', '))
        }
      }

      if (text_direction) {
        if (!is.string(text_direction) || !directions.includes(text_direction)) {
          catchErr('`pwa.appearance.text_direction` must be one of: ' + directions.join(', '))
        }
      }

      if (icons) {
        const iconStatus: [boolean, Error[]] = validIcons(icons)

        if (is.array(iconStatus) && !iconStatus[0] && is.array(iconStatus[1])) {
          validationErrors.push(...iconStatus[1])
        }
      }
    }

    if (shortcuts) {
      if (!is.array(shortcuts)) {
        throw new Error('`pwa.shortcuts` must be an array')
      }

      shortcuts.forEach((shortcut: any) => {
        if (typeof shortcut !== 'object') {
          throw new Error('`pwa.shortcuts` must be an array of objects')
        }

        if (shortcut.name) {
          if (!is.string(shortcut.name)) {
            catchErr('`pwa.shortcuts.name` must be a string')
          }
        } else {
          catchErr('`pwa.shortcuts.name` is required')
        }

        if (shortcut.url) {
          if (!validUrl || !validPath) {
            catchErr('`pwa.shortcuts.url` must be a valid path or URL')
          }
        } else {
          catchErr('`pwa.shortcuts.url` is required')
        }

        if (shortcut.description) {
          if (!is.string(shortcut.description)) {
            catchErr('`pwa.shortcuts.description` must be a string')
          } else {
            if (shortcut.description.length > 48) {
              catchErr('`pwa.shortcuts.description` must be less than 48 characters')
            }
          }
        } else {
          catchErr('`pwa.shortcuts.description` is required')
        }

        if (shortcut.icons) {
          validIcons(shortcut.icons)
        }
      })
    }

    if (related_apps) {
      if (!is.array(related_apps)) {
        throw new Error('`pwa.related_apps` must be an array')
      }

      related_apps.forEach((relatedApp: any) => {
        if (typeof relatedApp !== 'object') {
          throw new Error('`pwa.related_apps` must be an array of objects')
        }

        if (relatedApp.platform) {
          if (!is.string(relatedApp.platform) || !appPlatforms.includes(relatedApp.platform)) {
            catchErr('`pwa.related_apps.platform must be one of:' + appPlatforms.join(', '))
          }
        } else {
          catchErr('`pwa.related_apps.platform` is required')
        }

        if (relatedApp.url) {
          if (!validUrl) {
            catchErr('`pwa.related_apps.url` must be a valid URL')
          }
        } else {
          catchErr('`pwa.related_apps.url` is required')
        }
      })
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validatePwa
