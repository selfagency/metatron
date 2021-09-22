import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import logger from '../logger'
import Stack from '../types/stack.d'

const validStack = (stack: Stack): boolean => {
  try {
    if (!is.object(stack)) {
      catchErr('stack', false, 'object', stack)
    } else {
      const { components, standards, software } = stack

      if (components) {
        if (!is.array(components)) {
          catchErr('stack.components', true, 'array', components)
        } else {
          components.forEach(component => {
            if (!is.string(component)) {
              catchErr('stack.components', true, 'strings', component)
            }
          })
        }
      }

      if (standards) {
        if (!is.array(standards)) {
          catchErr('stack.standards', true, 'array', standards)
        } else {
          standards.forEach(standard => {
            if (!is.string(standard)) {
              catchErr('stack.standards', true, 'strings', standard)
            }
          })
        }
      }

      if (software) {
        if (!is.array(software)) {
          catchErr('stack.software', true, 'array', software)
        } else {
          software.forEach(app => {
            if (!is.string(app)) {
              catchErr('stack.software', true, 'strings', app)
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

export default validStack
