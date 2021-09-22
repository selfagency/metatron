import { Path, Uri, Url, UserAddress } from './generics.d'

interface Security {
  policy?: Url
  contact: UserAddress | Url | Uri
  public_key?: Path | Url
}

export default Security
