import is from '@sindresorhus/is'
import isIp from 'is-ip'

const validIp = (ip: string): boolean => {
  return is.string(ip) && isIp(ip)
}

export default validIp
