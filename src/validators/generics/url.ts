import is from '@sindresorhus/is'
import parse from 'url-parse'
import validTld from './tld'

const validUrl = (url: string): boolean => {
  const uriPrefixes = [
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
    'mumble',
    'rtmp',
    'rtsp',
    'sftp',
    'smb',
    'ssh',
    'svn',
    'telnet',
    'vnc',
    'webcal',
    'ws'
  ]

  if (url && is.urlString(url)) {
    const parsed = parse(url.replace('www.', ''))
    const hostnameBits = parsed.hostname.split('.')

    return uriPrefixes.includes(parsed.protocol.replace(':', '')) && validTld(hostnameBits[hostnameBits.length - 1])
  } else {
    return false
  }
}

export default validUrl
