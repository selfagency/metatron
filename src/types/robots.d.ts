import { Path, Url } from './generics.d'

interface Directive {
  user_agent: string
  allow: Path[]
  disallow: Path[]
}

interface Robots {
  sitemap?: Path | Url
  crawl_delay?: number
  directives?: Directive[]
}

export default Robots
export { Directive }
