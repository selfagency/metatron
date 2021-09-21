import { Path, Url, UserAddress } from './generics.d'

interface Security {
  policy?: string
  contact?: {
    email?: UserAddress
    url?: Url
    public_key?: Path | Url
  }
}

export default Security
