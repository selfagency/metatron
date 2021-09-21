import is from '@sindresorhus/is'
import isIp from 'is-ip'
import logger from '../logger'
import validColor from './color'
import validCountry from './country'
import validLanguage from './language'

const validEmail = (email: string): boolean => {
  try {
    const emailRegex = new RegExp(
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    )

    return is.string(email) && emailRegex.test(email)
  } catch (error) {
    if (process.env.DEBUG) logger.debug(error)
    return false
  }
}

const validHostname = (hostname: string): boolean => {
  try {
    const hostnameRegex = new RegExp(/[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+/)

    return is.string(hostname) && hostnameRegex.test(hostname)
  } catch (error) {
    if (process.env.DEBUG) logger.debug(error)
    return false
  }
}

const validIp = (ip: string): boolean => {
  try {
    return is.string(ip) && isIp(ip)
  } catch (error) {
    if (process.env.DEBUG) logger.debug(error)
    return false
  }
}

const validPath = (path: string): boolean => {
  try {
    return is.string(path) && (path.startsWith('/') || path.startsWith('./') || path.startsWith('../'))
  } catch (error) {
    if (process.env.DEBUG) logger.debug(error)
    return false
  }
}

const validUrl = (url: string): boolean => {
  try {
    return is.string(url) && is.urlString(url)
  } catch (error) {
    if (process.env.DEBUG) logger.debug(error)
    return false
  }
}

export { validColor, validCountry, validEmail, validHostname, validIp, validLanguage, validPath, validUrl }
