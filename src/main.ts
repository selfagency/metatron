import generateAdsTxt from './generators/ads'
import generateHumansTxt from './generators/humans'
import generateRobotsTxt from './generators/robots'
import generateSecurityTxt from './generators/security'
import generateTrustTxt from './generators/trust'
import generateWebmanifest from './generators/webmanifest'
import loadConfig from './loadConfig'
import logger from './logger'
import { Config } from './types/main.d'

try {
  const config: Config | undefined = loadConfig()

  if (config) {
    generateAdsTxt(config)
    generateHumansTxt(config)
    generateRobotsTxt(config)
    generateSecurityTxt(config)
    generateTrustTxt(config)
    generateWebmanifest(config)
  }
} catch (error) {
  logger.error(error)
}
