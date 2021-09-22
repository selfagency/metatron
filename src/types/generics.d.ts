import { Colors, HexColors } from './colors'

declare enum MimeTypes {
  bmp = 'bmp',
  gif = 'gif',
  ico = 'vnd.microsoft.icon',
  jpg = 'jpeg',
  png = 'png',
  svg = 'svg+xml',
  tif = 'tiff',
  webp = 'webp'
}

declare enum LocalUris {
  callto = 'callto',
  dav = 'dav',
  facetime = 'facetime',
  jabber = 'jabber',
  mailto = 'mailto',
  sip = 'sip',
  sips = 'sips',
  skype = 'skype',
  sms = 'sms',
  tel = 'tel',
  xmpp = 'xmpp'
}

declare enum Uris {
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
  mumble = 'mumble',
  rtmp = 'rtmp',
  rtsp = 'rtsp',
  sftp = 'sftp',
  smb = 'smb',
  ssh = 'ssh',
  svn = 'svn',
  telnet = 'telnet',
  vnc = 'vnc',
  webcal = 'webcal',
  ws = 'ws'
}

/* URL prefix */
declare type Uri = `${LocalUris}:${string}`

/* ipv4 */
declare type IpAddress = `${number}.${number}.${number}.${number}`

/* hostname */
declare type DnsAddress = `${string}.${string}`

/* email or login */
declare type UserAddress = `${string}@${IpAddress | DnsAddress}`

/* uri */
declare type Url = `${Uris}://${IpAddress | DnsAddress}${string}`

/* path beginning with / or ./ */
declare type Path = `${'/' | './'}${string | null}`

/* mime type, eg., image/png */
declare type MimeType = `image/${MimeTypes}`

/* size string, eg. 48x48 */
declare type SizeString = `${number}x${number}`

/* color string, eg. #FF0000 */
declare type HexColor = `#${HexColors}`

/* color string, eg. Red */
declare type Color = `${Colors}`

export { IpAddress, DnsAddress, Color, HexColor, MimeType, UserAddress, Uri, Url, Path, SizeString }
