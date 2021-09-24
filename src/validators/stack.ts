import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../lib/errors'
import Stack from '../types/stack.d'

const validStack = (stack: Stack): boolean => {
  if (!is.object(stack)) {
    catchErr('stack', false, 'object', stack)
    return false
  }

  const { components, standards, devtools } = stack

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

  if (devtools) {
    if (!is.array(devtools)) {
      catchErr('stack.devtools', true, 'array', devtools)
      return false
    }

    devtools.forEach(app => {
      if (!is.string(app)) {
        catchErr('stack.devtools', true, 'strings', app)
      }
    })
  }

  return !validationErrors.length
}

export default validStack
