/* ^.+:\/{0,2} */
declare type Uri = `${string}${':' | '://'}`

/* ipv4 */
declare type IpAddress = `${number}.${number}.${number}.${number}`

/* hostname */
declare type DnsAddress = `${string}.${string}`

/* email or login */
declare type UserAddress = `${string}@${IpAddress | DnsAddress}`

/* uri */
declare type Url = `${Uri}${IpAddress | DnsAddress}${string}`

/* ^[\/\.] */
declare type Path = `${'/' | './'}${string | null}`

export { IpAddress, DnsAddress, UserAddress, Url, Path }
