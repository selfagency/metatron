import ftconfig from 'ftconfig'
import { WriteConfig } from 'ftconfig/lib/WriteConfig'
import path from 'path'
import { Config } from '../types/main.d'
import logger from './logger'

const loadConfig = () => {
  try {
    const config: WriteConfig<Config> = ftconfig.readFile(path.join(process.cwd(), '/metatron.yml'), {
      encoding: 'utf-8',
      type: 'yaml'
    })

    config.modify(obj => {
      obj.settings = Object.assign({ updated: new Date().toISOString() }, obj.settings)
      return obj
    })

    logger.success('Successfully loaded `metatron.yml`')
    if (process.env.DEBUG) logger.debug(config.toString())

    return config.toObject()
  } catch (error) {
    logger.error('`metatron.yml` failed to load or cannot be located at project root')
    if (process.env.DEBUG) logger.debug(error)
    process.exit(1)
  }
}

export default loadConfig
