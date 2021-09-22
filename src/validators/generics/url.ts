import is from '@sindresorhus/is'
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
    const prefix = url.split(':')[0]

    url = url.replace(new RegExp(prefix + ':'), '')
    url = url.replace(new RegExp('//'), '')

    const suffix = url.includes('/') ? url.split('/')[0].split('.')[1] : url.split('.')[1]

    return uriPrefixes.includes(prefix) && validTld(suffix)
  } else {
    return false
  }
}

export default validUrl
