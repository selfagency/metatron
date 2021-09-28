import { Path, Url } from './generics.d'

interface Directive {
  user_agent: string
  crawl_delay?: number
  allow?: Path[]
  disallow?: Path[]
}

interface Robots {
  sitemap?: Path | Url
  directives?: Directive[]
}

export default Robots
export { Directive }
