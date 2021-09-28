import is from '@sindresorhus/is'
import parse from 'url-parse'

const validUri = (uri: string): boolean => {
  const uriPrefixes = ['callto', 'dav', 'facetime', 'jabber', 'mailto', 'sip', 'sips', 'skype', 'sms', 'tel', 'xmpp']

  if (uri && is.urlString(uri)) {
    const split = parse(uri)

    return uriPrefixes.includes(split.protocol.replace(':', '')) && is.string(split.hostname)
  } else {
    return false
  }
}

export default validUri
