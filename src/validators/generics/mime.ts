import is from '@sindresorhus/is'

const mimeTypes = ['bmp', 'gif', 'vnd.microsoft.icon', 'jpeg', 'png', 'svg+xml', 'tiff', 'webp']

const validMimeType = (mimeType: string): boolean => {
  if (mimeType && is.string(mimeType)) {
    mimeType = mimeType.replace('image/', '')
    return mimeTypes.includes(mimeType)
  } else {
    return false
  }
}

export default validMimeType
