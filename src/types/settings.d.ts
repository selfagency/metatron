import { Path } from './generics.d'

declare enum RunMode {
  ci = 'ci',
  middleware = 'middleware'
}

interface Settings {
  mode?: RunMode
  expiry?: number
  license?: string
  output_dir?: Path
  favicon?: boolean
}

export default Settings
