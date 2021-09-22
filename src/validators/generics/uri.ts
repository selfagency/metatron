import is from '@sindresorhus/is'

const validUri = (uri: string): boolean => {
  const uriPrefixes = ['callto', 'dav', 'facetime', 'jabber', 'mailto', 'sip', 'sips', 'skype', 'sms', 'tel', 'xmpp']

  if (uri && is.urlString(uri)) {
    const split = uri.split(':')

    return uriPrefixes.includes(split[0]) && is.string(split[1])
  } else {
    return false
  }
}

export default validUri
