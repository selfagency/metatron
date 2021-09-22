import is from '@sindresorhus/is'
import validHostname from './hostname'

const validEmail = (email: string): boolean => {
  const emailRegex = new RegExp(
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
  )

  if (email && is.string(email) && emailRegex.test(email)) {
    const split = email.split('@')
    const hostname = split[split.length - 1]

    return validHostname(hostname)
  } else {
    return false
  }
}

export default validEmail
