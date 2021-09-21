import is from '@sindresorhus/is'
import logger from '../logger'
import Site from '../types/site.d'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const validSite = (site: Site): [boolean, Error[]] => {
  try {
    if (!is.object(site)) {
      catchErr('`site` must be an object')
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validSite
