import { errorOutput, validationErrors } from './errors'
import generateAdsTxt from './generators/ads'
import generateHumansTxt from './generators/humans'
import generateRobotsTxt from './generators/robots'
import generateSecurityTxt from './generators/security'
import generateTrustTxt from './generators/trust'
import generateWebmanifest from './generators/webmanifest'
import loadConfig from './loadConfig'
import logger from './logger'
import { Config } from './types/main.d'
import validAds from './validators/ads'
import validHumans from './validators/humans'
import validPwa from './validators/pwa'
import validRobots from './validators/robots'
import validSecurity from './validators/security'
import validSettings from './validators/settings'
import validSite from './validators/site'
import validTrust from './validators/trust'

const exit = () => {
  logger.error(errorOutput())
  if (require.main === module) process.exit(1)
}

const main = (): void => {
  try {
    const config: Config | undefined = loadConfig()

    if (config) {
      const { ads, robots, security, trust, pwa, publisher, authors, credits, site, settings } = config

      if (((settings && validSettings(settings)) || !settings) && site && validSite(site)) {
        if (ads && validAds(ads)) generateAdsTxt(config)
        if (robots && validRobots(robots)) generateRobotsTxt(config)
        if (security && validSecurity(security)) generateSecurityTxt(config)
        if (trust && validTrust(trust)) generateTrustTxt(config)
        if (pwa && validPwa(pwa)) generateWebmanifest(config)
        if ((publisher || authors || credits) && validHumans(publisher, authors, credits)) generateHumansTxt(config)

        if (validationErrors.length) {
          exit()
        } else {
          logger.success('Successfully validated `metatron.yml`')
        }
      } else {
        exit()
      }
    } else {
      throw new Error('Error parsing Metatron configuration')
    }
  } catch (error) {
    logger.error(error)
  }
}

main()
