import { DnsAddress, Url, UserAddress } from './generics.d'

interface Ads {
  contact: UserAddress | Url
  sellers: {
    domain: DnsAddress
    publisher_id: string
    account_type: string
    cert_auth_id?: string
    comment?: string
  }[]
  inventory_partners?: DnsAddress[]
  subdomains?: DnsAddress[]
}

export default Ads
