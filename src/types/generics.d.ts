import Tld from './tld.d'

declare enum prefix {
  callto = 'callto',
  dav = 'dav',
  facetime = 'facetime',
  feed = 'feed',
  ftp = 'ftp',
  gemini = 'gemini',
  git = 'git',
  gopher = 'gopher',
  http = 'http',
  https = 'https',
  irc = 'irc',
  irc6 = 'irc6',
  ircs = 'ircs',
  jabber = 'jabber',
  mailto = 'mailto',
  mumble = 'mumble',
  rtmp = 'rtmp',
  rtsp = 'rtsp',
  sftp = 'sftp',
  sip = 'sip',
  sips = 'sips',
  skype = 'skype',
  smb = 'smb',
  sms = 'sms',
  ssh = 'ssh',
  svn = 'svn',
  tel = 'tel',
  telnet = 'telnet',
  vnc = 'vnc',
  webcal = 'webcal',
  ws = 'ws',
  xmpp = 'xmpp'
}

/* ^.+:\/{0,2} */
declare type Uri = `${prefix}${':' | '://'}`

/* ipv4 */
declare type IpAddress = `${number}.${number}.${number}.${number}`

/* hostname */
declare type DnsAddress = `${string}.${Tld}`

/* email or login */
declare type UserAddress = `${string}@${IpAddress | DnsAddress}`

/* uri */
declare type Url = `${Uri}${IpAddress | DnsAddress}${string}`

/* ^[\/\.] */
declare type Path = `${'/' | './'}${string | null}`

export { IpAddress, DnsAddress, UserAddress, Url, Path }
