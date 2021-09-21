import { Url, UserAddress } from './generics.d'

interface Person {
  name: string
  role?: string
  location?: string
  email?: UserAddress
  url: Url
  social_media?: Url[]
}

export default Person
