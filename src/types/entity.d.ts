import { Url, UserAddress } from './generics'

interface Entity {
  name: string
  role?: string
  location?: string
  email?: UserAddress
  url: Url
  social_media?: Url[]
}

export default Entity
