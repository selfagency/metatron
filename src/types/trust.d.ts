import { Url } from './generics.d'

interface Trust {
  affiliation?: Url[]
  controlled_by?: Url
  controls?: Url[]
  members?: Url[]
}

export default Trust
