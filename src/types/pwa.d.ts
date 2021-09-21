import { Path, Url } from './generics.d'

declare enum Dir {
  auto = 'auto',
  ltr = 'ltr',
  rtl = 'rtl'
}

declare enum Display {
  fullscreen = 'fullscreen',
  standalone = 'standalone',
  minimal_ui = 'minimal-ui',
  browser = 'browser'
}

declare enum Orientation {
  any = 'any',
  natural = 'natural',
  landscape = 'landscape',
  landscape_primary = 'landscape-primary',
  landscape_secondary = 'landscape-secondary',
  portrait = 'portrait',
  portrait_primary = 'portrait-primary',
  portrait_secondary = 'portrait-secondary'
}

declare enum AppPlatform {
  itunes = 'itunes',
  play = 'play'
}

declare interface Icon {
  src: Path | Url
  size: string
  type: string
}

interface Pwa {
  short_name: string
  categories?: string[]
  start_url: Url
  scope?: string
  appearance?: {
    display_mode?: Display
    background_color?: string
    theme_color?: string
    orientation?: Orientation
    text_direction?: Dir
    icons?: Icon[]
  }
  shortcuts?: {
    name: string
    url: Url
    description?: string
    icons?: Icon[]
  }[]
  related_apps?: {
    platform: AppPlatform
    url: Url
  }[]
  prefer_related_apps?: boolean
  iarc_rating_id?: string
  screenshots?: string[]
}

export default Pwa
export { Icon }
