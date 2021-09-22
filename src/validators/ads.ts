import is from '@sindresorhus/is'
import { catchErr, validationErrors } from '../errors'
import { Ads } from '../types/main.d'
import { validEmail, validHostname, validUrl } from './generics'

const accountTypes = ['DIRECT', 'RESELLER']

const validAds = (ads: Ads): boolean => {
  if (!is.object(ads)) {
    catchErr('ads', false, 'object', ads)
  } else {
    const { contact, sellers, inventory_partners, subdomains } = ads

    if (!contact || (!validEmail(contact) && !validUrl(contact))) {
      catchErr('ads.contact', true, 'email or URL', contact)
    }

    if (sellers) {
      if (!is.array(sellers)) {
        catchErr('ads.sellers', true, 'array', sellers)
      } else {
        sellers.forEach(seller => {
          if (!is.object(seller)) {
            catchErr('ads.sellers', true, 'array of objects', seller)
          } else {
            const { domain, publisher_id, account_type, cert_auth_id, comment } = seller

            if (!domain || !validHostname(domain)) {
              catchErr('ads.sellers.domain', true, 'hostname', domain)
            }

            if (!publisher_id || !is.string(publisher_id)) {
              catchErr('ads.sellers.publisher_id', true, 'string', publisher_id)
            }

            if (!account_type || !is.string(account_type) || !accountTypes.includes(account_type)) {
              catchErr('ads.sellers.account_type', true, 'one of: ' + accountTypes.join(', '), account_type)
            }

            if (cert_auth_id) {
              if (!is.string(cert_auth_id)) {
                catchErr('ads.sellers.cert_auth_id', false, 'string', cert_auth_id)
              }
            }

            if (comment && !is.string(comment)) {
              catchErr('ads.sellers.comment', false, 'string', comment)
            }
          }
        })
      }
    } else {
      catchErr('ads.sellers', true)
    }

    if (inventory_partners) {
      if (!is.array(inventory_partners)) {
        catchErr('ads.inventory_partners', false, 'array', inventory_partners)
      } else {
        inventory_partners.forEach(partner => {
          if (!validHostname(partner)) {
            catchErr('ads.inventory_partners', true, 'hostname', partner)
          }
        })
      }
    }

    if (subdomains) {
      if (!is.array(subdomains)) {
        catchErr('ads.subdomains', false, 'array', subdomains)
      } else {
        subdomains.forEach(subdomain => {
          if (!validHostname(subdomain)) {
            catchErr('ads.subdomains', true, 'hostname', subdomain)
          }
        })
      }
    }
  }

  return !validationErrors.length
}

export default validAds
