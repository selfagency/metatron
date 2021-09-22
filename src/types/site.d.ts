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
  url: Url
  logo?: Path | Url
  default_image?: Path | Url
  contact?: UserAddress | Url
  country?: Country
  doctype?: DocType
  language?: Language
  social_media?: Url[]
  feeds?: {
    rss?: Path | Url
    atom?: Path | Url
    json?: Path | Url
  }
  privacy_policy?: Path | Url
  acceptable_use_policy?: Path | Url
  terms_of_service?: Path | Url
}

export default Site
