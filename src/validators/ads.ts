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
    if (!is.object(ads)) {
      catchErr('`ads` must be an object')
    } else {
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
          catchErr('`ads.sellers` must be an array')
        } else {
          sellers.forEach(seller => {
            if (!is.object(seller)) {
              catchErr('`ads.sellers` must be an array of objects')
            }

            if (!validHostname(seller.domain)) {
              catchErr('`ads.sellers.domain` must be a valid hostname')
            }

            if (!is.string(seller.publisher_id)) {
              catchErr('`ads.sellers.publisher_id` is required')
            }

            if (!is.string(seller.account_type) || !accountTypes.includes(seller.account_type)) {
              catchErr('`ads.sellers.account_type` must be one of: ' + accountTypes.join(', '))
            }

            if (seller.cert_auth_id) {
              if (!is.string(seller.cert_auth_id)) {
                catchErr('`ads.sellers.cert_auth_id` must be a string')
              }
            }

            if (seller.comment) {
              if (!is.string(seller.comment)) {
                catchErr('`ads.sellers.comment` must be a string')
              }
            }
          })
        }
      } else {
        catchErr('`ads.sellers` is required')
      }

      if (inventory_partners) {
        if (!is.array(inventory_partners)) {
          catchErr('`ads.inventory_partners` must be an array')
        } else {
          inventory_partners.forEach(partner => {
            if (!validHostname(partner)) {
              catchErr('`ads.inventory_partners` must contain valid hostnames')
            }
          })
        }
      }

      if (subdomains) {
        if (!is.array(subdomains)) {
          catchErr('`ads.subdomains` must be an array')
        } else {
          subdomains.forEach(subdomain => {
            if (!validHostname(subdomain)) {
              catchErr('`ads.subdomains` must contain valid hostnames')
            }
          })
        }
      }
    }

    return validationErrors.length ? [false, validationErrors] : [true, []]
  } catch (error) {
    logger.error(error)
    return [false, [<Error>error]]
  }
}

export default validAds
