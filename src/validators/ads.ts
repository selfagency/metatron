import is from '@sindresorhus/is'
import logger from '../logger'
import { Ads } from '../types/main.d'
import { validEmail, validHostname, validUrl } from './generics'

const validationErrors: Error[] = []

const catchErr = (msg: string) => {
  const error = new Error(msg)
  validationErrors.push(error)
  if (process.env.DEBUG) logger.debug(error)
}

const accountTypes = ['DIRECT', 'RESELLER']

const validAds = (ads: Ads): [boolean, Error[]] => {
  try {
    if (typeof ads !== 'object') {
      throw new Error('`ads` must be an object')
    }

    const { contact, sellers, inventory_partners, subdomains } = ads

    if (contact) {
      if (!validEmail(contact) && !validUrl(contact)) {
        catchErr('`ads.contact` must be a valid email address or URL')
      }
    } else {
      catchErr('`ads.contact` is required')
    }

    if (sellers) {
      if (!is.array(sellers)) {
        throw new Error('`ads.sellers` must be an array')
      }

      sellers.forEach(seller => {
        if (typeof seller !== 'object') {
          throw new Error('`ads.sellers` must be an array of objects')
        }

        if (!validHostname(seller.domain)) {
          catchErr('`ads.sellers.domain` must be a valid hostname')
        }

        if (typeof seller.publisher_id !== 'string') {
          catchErr('`ads.sellers.publisher_id` is required')
        }

        if (seller.account_type !== 'DIRECT' && seller.account_type !== 'RESELLER') {
          catchErr('`ads.sellers.account_type` must be one of: ' + accountTypes.join(', '))
        }

        if (seller.cert_auth_id) {
          if (typeof seller.cert_auth_id !== 'string') {
            catchErr('`ads.sellers.cert_auth_id` must be a string')
          }
        }

        if (seller.comment) {
          if (typeof seller.comment !== 'string') {
            catchErr('`ads.sellers.comment` must be a string')
          }
        }
      })
    } else {
      catchErr('`ads.sellers` is required')
    }

    if (inventory_partners) {
      if (!is.array(inventory_partners)) {
        throw new Error('`ads.inventory_partners` must be an array')
      }

      inventory_partners.forEach(partner => {
        if (!is.string(partner)) {
          throw new Error('`ads.inventory_partners` must be an array of strings')
        }

        if (!validHostname(partner)) {
          catchErr('`ads.inventory_partners` must contain valid hostnames')
        }
      })
    }

    if (subdomains) {
      if (!is.array(subdomains)) {
        throw new Error('`ads.subdomains` must be an array')
      }

      subdomains.forEach(subdomain => {
        if (!is.string(subdomain)) {
          throw new Error('`ads.subdomains` must be an array of strings')
        }

        if (!validHostname(subdomain)) {
          catchErr('`ads.subdomains` must contain valid hostnames')
        }
      })
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validAds
