import { Path, Uri, Url, UserAddress } from './generics.d'

interface Security {
  reporting_policy?: Url
  contact: UserAddress | Url | Uri
  public_key?: Path | Url
  canonical?: Url
  acknowledgements?: {
    source: string
    url: Url
  }[]
  use_well_known?: boolean
}

export default Security
