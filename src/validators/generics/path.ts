import is from '@sindresorhus/is'

const validPath = (path: string): boolean => {
  return is.string(path) && (path.startsWith('/') || path.startsWith('./') || path.startsWith('../'))
}

export default validPath
