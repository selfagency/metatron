import is from '@sindresorhus/is'
import isIp from 'is-ip'
import validColor from './color'
import validCountry from './country'
import validLanguage from './language'
import validTld from './tld'

const validEmail = (email: string): boolean => {
  const emailRegex = new RegExp(
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
  )

  return is.string(email) && emailRegex.test(email)
}

const validHostname = (hostname: string): boolean => {
  const hostnameRegex = new RegExp(/^[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)

  return is.string(hostname) && hostnameRegex.test(hostname)
}

const validIp = (ip: string): boolean => {
  return is.string(ip) && isIp(ip)
}

const validPath = (path: string): boolean => {
  return is.string(path) && (path.startsWith('/') || path.startsWith('./') || path.startsWith('../'))
}

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

  if (url && is.string(url) && is.urlString(url)) {
    const prefix = url.split(':')[0]
    const suffix = url.split('.')[url.split('.').length - 1]

    return uriPrefixes.includes(prefix) && validTld(suffix)
  } else {
    return false
  }
}

export { validColor, validCountry, validEmail, validHostname, validIp, validLanguage, validPath, validTld, validUrl }
