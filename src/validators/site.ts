import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import Site from '../types/site.d'
import { validCountry, validEmail, validLanguage, validPath, validUrl } from './generics'

const validSite = (site: Site): boolean => {
  try {
    const docTypes = ['HTML5', 'HTML4', 'XHTML']

    if (!is.object(site)) {
      catchErr('site', true, 'object', site)
    } else {
      const { name, description, url, logo, default_image, contact, country, doctype, language, social_media, feeds } =
        site

      if (!name || !is.string(name)) {
        catchErr('site.name', true, 'string', name)
      }

      if (description && !is.string(description)) {
        catchErr('site.description', false, 'string', description)
      }

      if (!url || !validUrl(url)) {
        catchErr('site.url', true, 'URL', url)
      }

      if (logo && !validUrl(logo) && !validPath(logo)) {
        catchErr('site.logo', false, 'path or URL', logo)
      }

      if (default_image && !validUrl(default_image) && !validPath(default_image)) {
        catchErr('site.default_image', false, 'path or URL', default_image)
      }

      if (contact && !validEmail(contact) && !validUrl(contact)) {
        catchErr('site.contact', false, 'email or URL', contact)
      }

      if (country && !validCountry(country)) {
        catchErr('site.country', false, 'country code', country)
      }

      if (doctype && (!is.string(doctype) || !docTypes.includes(doctype))) {
        catchErr('site.doctype', false, 'one of: ' + docTypes.join(', '), doctype)
      }

      if (language && !validLanguage(language)) {
        catchErr('site.language', false, 'language code', language)
      }

      if (social_media) {
        if (!is.array(social_media)) {
          catchErr('site.social_media', false, 'array', social_media)
        } else {
          social_media.forEach(socialMedia => {
            if (!validUrl(socialMedia)) {
              catchErr('site.social_media', false, 'URL', socialMedia)
            }
          })
        }
      }

      if (feeds) {
        if (!is.object(feeds)) {
          catchErr('site.feeds', false, 'object', feeds)
        } else {
          const { rss, atom, json } = feeds

          if (rss && !validUrl(rss) && !validPath(rss)) {
            catchErr('site.feeds.rss', false, 'path or URL', rss)
          }

          if (atom && !validUrl(atom) && !validPath(atom)) {
            catchErr('site.feeds.atom', false, 'path or URL', atom)
          }

          if (json && !validUrl(json) && !validPath(json)) {
            catchErr('site.feeds.json', false, 'path or URL', json)
          }
        }
      }
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default validSite
