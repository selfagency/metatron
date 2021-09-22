import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Robots from '../types/robots.d'
import { validPath, validUrl } from './generics'

const validDirective = (directive: { user_agent: string; paths: string[] }, directiveType: string): void => {
  if (is.object(directive)) {
    const { user_agent, paths } = directive

    if (!user_agent || !is.string(user_agent)) {
      catchErr('robots.' + directiveType + '.user_agent', true, 'string', user_agent)
    }

    if (!paths || !is.array(paths)) {
      catchErr('robots.' + directiveType + '.paths', true, 'array', paths)
    } else {
      paths.forEach(path => {
        if (!validPath(path)) {
          catchErr('robots.' + directiveType + '.paths.path', true, 'path', path)
        }
      })
    }
  } else {
    catchErr('robots.' + directiveType, true, 'array of objects', directive)
  }
}

const validRobots = (robots: Robots): boolean => {
  if (is.object(robots)) {
    const { sitemap, crawl_delay, allow, disallow } = robots

    if (sitemap && !validPath(sitemap) && !validUrl(sitemap)) {
      catchErr('robots.sitemap', false, 'path or URL', sitemap)
    }

    if (crawl_delay && !is.number(crawl_delay)) {
      catchErr('robots.crawl_delay', false, 'number', crawl_delay)
    }

    if (allow && !is.array(allow)) {
      catchErr('robots.allow', false, 'array', allow)
    }

    if (allow && is.array(allow)) {
      allow.forEach(directive => {
        validDirective(directive, 'allow')
      })
    }

    if (disallow && !is.array(disallow)) {
      catchErr('robots.disallow', false, 'array', disallow)
    }

    if (disallow && is.array(disallow)) {
      disallow.forEach(directive => {
        validDirective(directive, 'disallow')
      })
    }
  } else {
    catchErr('robots', false, 'object', robots)
  }

  return !validationErrors.length
}

export default validRobots
