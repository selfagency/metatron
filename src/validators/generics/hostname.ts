import is from '@sindresorhus/is'
import validTld from './tld'

const validHostname = (hostname: string): boolean => {
  if (hostname && is.string(hostname)) {
    const hostnameRegex = new RegExp(/^[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)
    const split = hostname.split('.')
    const suffix = split[split.length - 1]

    return is.string(hostname) && hostnameRegex.test(hostname) && validTld(suffix)
  } else {
    return false
  }
}

export default validHostname
