import Ads from './ads.d'
import Person from './person.d'
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
  publisher?: Person
  authors?: Person[]
  credits?: Person[]
  trust?: Trust
  stack?: Stack
  security?: Security
  robots?: Robots
  ads?: Ads
  settings: Settings
}

export { Site, Pwa, Person, Trust, Stack, Security, Robots, Ads, Config }
