import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../lib/errors'
import Robots, { Directive } from '../types/robots.d'
import { validPath, validUrl } from './generics'

const validDirective = (directive: Directive): boolean => {
  if (!is.object(directive)) {
    catchErr('robots.directives', true, 'array of objects', directive)
    return false
  }

  const { user_agent, allow, disallow } = directive
  const noAllow = (allow && !is.array(allow)) || (is.array(allow) && allow.length === 0)
  const noDisallow = (disallow && !is.array(disallow)) || (is.array(disallow) && disallow.length === 0)

  if (!user_agent || !is.string(user_agent)) {
    catchErr('robots.directives.user_agent', true, 'string', user_agent)
  }

  if (noAllow && noDisallow) {
    catchErr('robots.directives.directives', true, 'paths', { allow, disallow })
    return false
  }

  if (noAllow) {
    catchErr('robots.directives.allow', true, 'array', allow)
    return false
  } else if (allow) {
    allow.forEach(path => {
      if (!validPath(path)) {
        catchErr('robots.directives.allow.path', true, 'path', path)
      }
    })
  }

  if (noDisallow) {
    catchErr('robots.directives.disallow', true, 'array', allow)
    return false
  } else if (disallow) {
    disallow.forEach(path => {
      if (!validPath(path)) {
        catchErr('robots.directives.disallow.path', true, 'path', path)
      }
    })
  }

  return !validationErrors.length
}

const validRobots = (robots: Robots): boolean => {
  if (!is.object(robots)) {
    catchErr('robots', false, 'object', robots)
    return false
  }

  const { sitemap, crawl_delay, directives } = robots

  if (!sitemap && !crawl_delay && !directives) {
    catchErr('robots.sitemap', true, 'at least one of: sitemap, crawl_delay, directives', sitemap)
  }

  if (sitemap && !validPath(sitemap) && !validUrl(sitemap)) {
    catchErr('robots.sitemap', false, 'path or URL', sitemap)
  }

  if (crawl_delay && !is.number(crawl_delay)) {
    catchErr('robots.crawl_delay', false, 'number', crawl_delay)
  }

  if (directives && !is.array(directives)) {
    catchErr('robots.directives', false, 'array', directives)
  }

  if (directives && is.array(directives)) {
    directives.forEach(directive => {
      validDirective(directive)
    })
  }

  return !validationErrors.length
}

export default validRobots
