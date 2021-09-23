import Ads from './ads.d'
import Entity from './entity.d'
import Pwa from './pwa.d'
import Robots from './robots.d'
import Security from './security.d'
import Settings from './settings.d'
import Site from './site.d'
import Stack from './stack.d'
import Trust from './trust.d'

interface Config {
  site: Site
  pwa?: Pwa
  publisher?: Entity
  contributors?: Entity[]
  credits?: Entity[]
  trust?: Trust
  stack?: Stack
  security?: Security
  robots?: Robots
  ads?: Ads
  settings: Settings
}

export { Site, Pwa, Entity, Trust, Stack, Security, Robots, Ads, Config }
