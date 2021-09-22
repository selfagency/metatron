import Country from './country.d'
import { Uri, Url, UserAddress } from './generics.d'

interface Entity {
  name: string
  role?: string
  location?: string
  country?: Country
  contact?: UserAddress | Uri | Url
  url: Url
  social_media?: Url[]
}

export default Entity
