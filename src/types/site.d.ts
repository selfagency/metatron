import Country from './country.d'
import { Path, Url, UserAddress } from './generics.d'
import Language from './language'

declare enum DocType {
  html_5 = 'HTML5',
  html_4 = 'HTML4',
  xhtml = 'XHTML'
}

interface Site {
  name: string
  description?: string
  email?: UserAddress
  url: Url
  logo?: Path | Url
  default_image?: Path | Url
  contact?: Url
  country?: Country
  doctype?: DocType
  language: Language
  social_media?: Url[]
  feeds?: {
    rss?: Url
    atom?: Url
    json?: Url
  }
}

export default Site
