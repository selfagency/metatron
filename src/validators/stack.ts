import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import Stack from '../types/stack.d'

const validStack = (stack: Stack): boolean => {
  if (!is.object(stack)) {
    catchErr('stack', false, 'object', stack)
    return false
  }

  const { components, standards, software } = stack

  if (components) {
    if (!is.array(components)) {
      catchErr('stack.components', true, 'array', components)
      return false
    }

    components.forEach(component => {
      if (!is.string(component)) {
        catchErr('stack.components', true, 'strings', component)
      }
    })
  }

  if (standards) {
    if (!is.array(standards)) {
      catchErr('stack.standards', true, 'array', standards)
      return false
    }

    standards.forEach(standard => {
      if (!is.string(standard)) {
        catchErr('stack.standards', true, 'strings', standard)
      }
    })
  }

  if (software) {
    if (!is.array(software)) {
      catchErr('stack.software', true, 'array', software)
      return false
    }

    software.forEach(app => {
      if (!is.string(app)) {
        catchErr('stack.software', true, 'strings', app)
      }
    })
  }

  return !validationErrors.length
}

export default validStack
