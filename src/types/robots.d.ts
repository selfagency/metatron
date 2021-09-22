import { Path, Url } from './generics.d'

interface Robots {
  sitemap?: Path | Url
  crawl_delay?: number
  allow?: {
    user_agent: string
    paths: Path[]
  }[]
  disallow?: {
    user_agent: string
    paths: Path[]
  }[]
}

export default Robots
