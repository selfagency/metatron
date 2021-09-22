import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Site from '../types/site.d'
import { validCountry, validEmail, validLanguage, validPath, validUri, validUrl } from './generics'

const docTypes = ['HTML5', 'HTML4', 'XHTML']

const validSite = (site: Site): boolean => {
  if (!is.object(site)) {
    catchErr('site', true, 'object', site)
    return false
  }

  const {
    name,
    description,
    url,
    logo,
    default_image,
    contact,
    country,
    doctype,
    language,
    social_media,
    feeds,
    privacy_policy,
    acceptable_use_policy,
    terms_of_service
  } = site

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

  if (contact && !validEmail(contact) && !validUri(contact) && !validUrl(contact)) {
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

      if (rss || atom || json) {
        if (rss && !validUrl(rss) && !validPath(rss)) {
          catchErr('site.feeds.rss', false, 'path or URL', rss)
        }

        if (atom && !validUrl(atom) && !validPath(atom)) {
          catchErr('site.feeds.atom', false, 'path or URL', atom)
        }

        if (json && !validUrl(json) && !validPath(json)) {
          catchErr('site.feeds.json', false, 'path or URL', json)
        }
      } else {
        catchErr('site.feeds', true, 'URL', feeds)
      }
    }
  }

  if (privacy_policy && !validUrl(privacy_policy) && !validPath(privacy_policy)) {
    catchErr('site.privacy_policy', false, 'path or URL', privacy_policy)
  }

  if (acceptable_use_policy && !validUrl(acceptable_use_policy) && !validPath(acceptable_use_policy)) {
    catchErr('site.acceptable_use_policy', false, 'path or URL', acceptable_use_policy)
  }

  if (terms_of_service && !validUrl(terms_of_service) && !validPath(terms_of_service)) {
    catchErr('site.terms_of_service', false, 'path or URL', terms_of_service)
  }

  return !validationErrors.length
}

export default validSite
