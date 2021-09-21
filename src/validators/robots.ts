import is from '@sindresorhus/is'
import logger from '../logger'
import Robots from '../types/robots.d'
import { validPath, validUrl } from './generics'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const validRobots = (robots: Robots): [boolean, Error[]] => {
  try {
    if (!is.object(robots)) {
      catchErr('`robots` must be an object')
    } else {
      const { sitemap, crawl_delay, allow, disallow } = robots

      if (sitemap) {
        if (!validPath(sitemap) && !validUrl(sitemap)) {
          catchErr('`robots.sitemap` must be a valid path or URL')
        }
      }

      if (crawl_delay) {
        if (!is.number(crawl_delay)) {
          catchErr('`robots.crawl_delay` must be a number')
        }
      }

      if (allow) {
        if (!is.array(allow)) {
          catchErr('`robots.allow` must be an array')
        } else {
          allow.forEach(directive => {
            if (!is.object(directive)) {
              catchErr('`robots.allow` must be an array of objects')
            } else {
              if (directive.user_agent) {
                if (!is.string(directive.user_agent)) {
                  catchErr('`robots.allow.user_agent` must be a string')
                }
              } else {
                catchErr('`robots.allow` directives must have a `user_agent` property')
              }

              if (directive.paths) {
                if (!is.array(directive.paths)) {
                  catchErr('`robots.allow.paths` must be an array')
                }

                directive.paths.forEach(path => {
                  if (!validPath(path)) {
                    catchErr('`robots.allow.paths` must be a valid path')
                  }
                })
              }
            }
          })
        }
      }

      if (disallow) {
        if (!is.array(disallow)) {
          catchErr('`robots.disallow` must be an array')
        } else {
          disallow.forEach(directive => {
            if (!is.object(directive)) {
              catchErr('`robots.disallow` must be an array of objects')
            } else {
              if (directive.user_agent) {
                if (!is.string(directive.user_agent)) {
                  catchErr('`robots.disallow.user_agent` must be a string')
                }
              } else {
                catchErr('`robots.disallow` directives require a `user_agent` property')
              }

              if (directive.paths) {
                if (!is.array(directive.paths)) {
                  catchErr('`robots.disallow.paths` must be an array')
                }

                directive.paths.forEach(path => {
                  if (!validPath(path)) {
                    catchErr('`robots.disallow.paths` must contain valid paths')
                  }
                })
              }
            }
          })
        }
      }
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validRobots
