import is from '@sindresorhus/is'
import validTld from './tld'

const validUrl = (url: string): boolean => {
  const uriPrefixes = [
    'callto',
    'dav',
    'facetime',
    'feed',
    'ftp',
    'gemini',
    'git',
    'gopher',
    'http',
    'https',
    'irc',
    'irc6',
    'ircs',
    'jabber',
    'mailto',
    'mumble',
    'rtmp',
    'rtsp',
    'sftp',
    'sip',
    'sips',
    'skype',
    'smb',
    'sms',
    'ssh',
    'svn',
    'tel',
    'telnet',
    'vnc',
    'webcal',
    'ws',
    'xmpp'
  ]

  if (url && is.urlString(url)) {
    const prefix = url.split(':')[0]

    url = url.replace(prefix + ':', '').replace('//', '')

    const suffix = url.includes('/') ? url.split('/')[0].split('.')[1] : url.split('.')[1]

    return uriPrefixes.includes(prefix) && validTld(suffix)
  } else {
    return false
  }
}

export default validUrl
