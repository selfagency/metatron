import { Path } from './generics.d'

declare enum RunMode {
  ci = 'ci',
  generator = 'generator',
  middleware = 'middleware'
}

interface Settings {
  mode?: RunMode
  expiry?: number
  license?: string
  output_dir?: Path
  favicon?: boolean
  tagline?: boolean
  updated?: string
}

export default Settings
export { RunMode }
