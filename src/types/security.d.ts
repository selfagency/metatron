import { Path, Url, UserAddress } from './generics.d'

interface Security {
  policy?: Url
  contact: UserAddress | Url
  public_key?: Path | Url
}

export default Security
