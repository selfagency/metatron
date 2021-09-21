import is from '@sindresorhus/is'
import logger from '../logger'
import Stack from '../types/stack.d'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const validStack = (stack: Stack): [boolean, Error[]] => {
  try {
    if (!is.object(stack)) {
      catchErr('`stack` must be an object')
    } else {
      const { components, standards, software } = stack

      if (!is.array(components)) {
        catchErr('`stack.components` must be an array')
      } else {
        components.forEach(component => {
          if (!is.string(component)) {
            catchErr('`stack.components` must be an array of strings')
          }
        })
      }

      if (!is.array(standards)) {
        catchErr('`stack.standards` must be an array')
      } else {
        standards.forEach(standard => {
          if (!is.string(standard)) {
            catchErr('`stack.standards` must be an array of strings')
          }
        })
      }

      if (!is.array(software)) {
        catchErr('`stack.software` must be an array')
      } else {
        software.forEach(software => {
          if (!is.string(software)) {
            catchErr('`stack.software` must be an array of strings')
          }
        })
      }
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validStack
