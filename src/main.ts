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
import validPwa from './validators/pwa'
import validRobots from './validators/robots'
import validTrust from './validators/trust'

try {
  const config: Config | undefined = loadConfig()

  if (config) {
    if (config.ads && validAds(config.ads)) generateAdsTxt(config)
    if (config.publisher || config.authors || config.credits) generateHumansTxt(config)
    if (config.robots && validRobots(config.robots)) generateRobotsTxt(config)
    if (config.security) generateSecurityTxt(config)
    if (config.trust && validTrust(config.trust)) generateTrustTxt(config)
    if (config.pwa && validPwa(config.pwa)) generateWebmanifest(config)
  }
} catch (error) {
  logger.error(error)
}
