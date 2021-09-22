import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Pwa from '../types/pwa.d'
import { validColor, validPath, validUrl } from './generics'
import validIcons from './icons'

const appPlatforms = ['play', 'itunes']
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

const validPwa = (pwa: Pwa): boolean => {
  if (is.object(pwa)) {
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

    if (!short_name || !is.string(pwa.short_name) || short_name.length > 15) {
      catchErr('pwa.short_name', true, 'string less than 15 characters in length', short_name)
    }

    if (categories) {
      if (!is.array(categories)) {
        catchErr('pwa.categories', false, 'array', categories)
      } else {
        categories.forEach((category: string) => {
          if (!is.string(category) || category.length > 48) {
            catchErr('pwa.categories', true, 'strings, each less than 48 characters in length', category)
          }
        })
      }
    }

    if (!start_url || (!validUrl(start_url) && !validPath(start_url))) {
      catchErr('pwa.start_url', true, 'path or URL', start_url)
    }

    if (scope && !validUrl(scope) && !validPath(scope)) {
      catchErr('pwa.scope', false, 'path or URL', scope)
    }

    if (appearance) {
      if (!is.object(appearance)) {
        catchErr('pwa.appearance', false, 'object', appearance)
      } else {
        const { display_mode, background_color, theme_color, orientation, text_direction, icons } = appearance

        if (display_mode && (!is.string(display_mode) || !displayModes.includes(display_mode))) {
          catchErr('pwa.appearance.display_mode', false, 'one of: ' + displayModes.join(', '), display_mode)
        }

        if (background_color && (!is.string(background_color) || !validColor(background_color))) {
          catchErr('pwa.appearance.background_color', false, 'web-safe color', background_color)
        }

        if (theme_color && (!is.string(theme_color) || !validColor(theme_color))) {
          catchErr('pwa.appearance.theme_color', false, 'web-safe color', theme_color)
        }

        if (orientation && (!is.string(orientation) || !orientations.includes(orientation))) {
          catchErr('pwa.appearance.orientation', false, 'one of: ' + orientations.join(', '), orientation)
        }

        if (text_direction && (!is.string(text_direction) || !directions.includes(text_direction))) {
          catchErr('pwa.appearance.text_direction', false, 'one of: ' + directions.join(', '), text_direction)
        }

        if (icons) {
          validIcons(icons)
        }
      }
    }

    if (shortcuts) {
      if (!is.array(shortcuts)) {
        catchErr('pwa.shortcuts', false, 'array', shortcuts)
      } else {
        shortcuts.forEach(shortcut => {
          if (!is.object(shortcut)) {
            catchErr('pwa.shortcuts', true, 'array of objects', shortcut)
          } else {
            const { name, url, description, icons } = shortcut

            if (!name || !is.string(name)) {
              catchErr('pwa.shortcuts.name', true, 'string')
            }

            if (!url || (!validUrl(url) && !validPath(url))) {
              catchErr('pwa.shortcuts.url', true, 'path or URL')
            }

            if (!description || !is.string(description)) {
              catchErr('pwa.shortcuts.description', true, 'string')
            }

            if (icons) {
              validIcons(icons)
            }
          }
        })
      }
    }

    if (related_apps) {
      if (!is.array(related_apps)) {
        catchErr('pwa.related_apps', false, 'array', related_apps)
      } else {
        related_apps.forEach(related_app => {
          if (!is.object(related_app)) {
            catchErr('pwa.related_apps', true, 'array of objects', related_app)
          } else {
            const { platform, url } = related_app

            if (!platform || !is.string(platform) || !appPlatforms.includes(platform)) {
              catchErr('pwa.related_apps.platform', true, 'one of: ' + appPlatforms.join(', '), platform)
            }

            if (!url || !validUrl(url)) {
              catchErr('pwa.related_apps.url', true, 'URL', url)
            }
          }
        })
      }
    }

    if (prefer_related_apps && !is.boolean(prefer_related_apps)) {
      catchErr('pwa.prefer_related_apps', false, 'boolean', prefer_related_apps)
    }

    if (iarc_rating_id && !is.string(iarc_rating_id)) {
      catchErr('pwa.iarc_rating_id', false, 'string', iarc_rating_id)
    }

    if (screenshots) {
      if (!is.array(screenshots)) {
        catchErr('pwa.screenshots', false, 'array', screenshots)
      } else {
        screenshots.forEach(screenshot => {
          if (!validUrl(screenshot) && !validPath(screenshot)) {
            catchErr('pwa.screenshots', true, 'path or URL', screenshot)
          }
        })
      }
    }

    return !validationErrors.length
  } else {
    catchErr('pwa', false, 'object', pwa)
    return false
  }
}

export default validPwa
