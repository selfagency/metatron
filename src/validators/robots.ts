import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import Robots from '../types/robots.d'
import { validPath, validUrl } from './generics'

const validRobots = (robots: Robots): boolean => {
  try {
    if (!is.object(robots)) {
      catchErr('robots', false, 'object', robots)
    } else {
      const { sitemap, crawl_delay, allow, disallow } = robots

      if (sitemap && !validPath(sitemap) && !validUrl(sitemap)) {
        catchErr('robots.sitemap', false, 'path or URL', sitemap)
      }

      if (crawl_delay && !is.number(crawl_delay)) {
        catchErr('robots.crawl_delay', false, 'number', crawl_delay)
      }

      if (allow) {
        if (!is.array(allow)) {
          catchErr('robots.allow', false, 'array', allow)
        } else {
          allow.forEach(directive => {
            if (!is.object(directive)) {
              catchErr('robots.allow', true, 'array of objects', directive)
            } else {
              const { user_agent, paths } = directive

              if (!user_agent || !is.string(user_agent)) {
                catchErr('robots.allow.user_agent', true, 'string', user_agent)
              }

              if (!paths || !is.array(paths)) {
                catchErr('robots.allow.paths', true, 'array', paths)
              } else {
                paths.forEach(path => {
                  if (!validPath(path)) {
                    catchErr('robots.allow.paths', true, 'paths', path)
                  }
                })
              }
            }
          })
        }
      }

      if (disallow) {
        if (!is.array(disallow)) {
          catchErr('robots.disallow', false, 'array', disallow)
        } else {
          disallow.forEach(directive => {
            if (!is.object(directive)) {
              catchErr('robots.disallow', true, 'array of objects', directive)
            } else {
              const { user_agent, paths } = directive

              if (!user_agent || !is.string(user_agent)) {
                catchErr('robots.disallow.user_agent', true, 'string', user_agent)
              }

              if (!paths || !is.array(paths)) {
                catchErr('robots.disallow.paths', true, 'array', paths)
              } else {
                paths.forEach(path => {
                  if (!validPath(path)) {
                    catchErr('robots.disallow.paths', true, 'paths', path)
                  }
                })
              }
            }
          })
        }
      }
    }

    return !validationErrors.length
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default validRobots
