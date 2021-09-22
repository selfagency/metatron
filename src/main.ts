import generateAdsTxt from './generators/ads'
import generateHumansTxt from './generators/humans'
import generateLicenseTxt from './generators/license'
import generateRobotsTxt from './generators/robots'
import generateSecurityTxt from './generators/security'
import generateTrustTxt from './generators/trust'
import generateWebmanifest from './generators/webmanifest'
import { errorOutput, validationErrors } from './lib/errors'
import loadConfig from './lib/loadConfig'
import logger from './lib/logger'
import { Config } from './types/main.d'
import validAds from './validators/ads'
import { validLicense } from './validators/generics'
import validHumans from './validators/humans'
import validPwa from './validators/pwa'
import validRobots from './validators/robots'
import validSecurity from './validators/security'
import validSettings from './validators/settings'
import validSite from './validators/site'
import validTrust from './validators/trust'

const main = (): void => {
  const config: Config | undefined = loadConfig()

  if (config) {
    const { ads, robots, security, trust, pwa, publisher, authors, credits, site, settings } = config

    // require valid settings and site config
    const haveSettings = settings && validSettings(settings)
    const haveSite = site && validSite(site)
    if ((haveSettings || !settings) && haveSite) {
      // ads.txt
      const haveAds = ads && validAds(ads)
      if (haveAds) {
        generateAdsTxt(config)
      }

      // humans.txt
      const haveHumans = (publisher || authors || credits) && validHumans(config)
      if (haveHumans) {
        generateHumansTxt(config)
      }

      // license.txt
      const haveLicense = settings.license && validLicense(settings.license)
      if (haveLicense && haveHumans) {
        generateLicenseTxt(config)
      }

      // robots.txt
      const haveRobots = robots && validRobots(robots)
      if (haveRobots) {
        generateRobotsTxt(config)
      }

      // security.txt
      const haveSecurity = security && validSecurity(security)
      if (haveSecurity) {
        generateSecurityTxt(config)
      }

      // trust.txt
      const haveTrust = trust && validTrust(trust)
      if (haveTrust) {
        generateTrustTxt(config)
      }

      // webmanifest
      const havePwa = pwa && validPwa(pwa)
      if (havePwa && haveSite) {
        generateWebmanifest(config)
      }
    }

    if (!validationErrors.length) {
      logger.success('Successfully validated `metatron.yml`')
    } else {
      logger.error(errorOutput())
    }
  } else {
    throw new Error('Unknown error parsing `metatron.yml`')
  }
}

// cli interface
if (require.main === module) {
  try {
    main()
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export default main
