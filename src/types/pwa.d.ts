import { Color, HexColor, MimeType, Path, SizeString, Url } from './generics.d'

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

interface Icon {
  src: Path | Url
  size: SizeString
  type: MimeType
}

interface Pwa {
  short_name: string
  categories?: string[]
  start_url: Path | Url
  scope?: Path | Url
  appearance?: {
    display_mode?: Display
    background_color?: Color | HexColor
    theme_color?: Color | HexColor
    orientation?: Orientation
    text_direction?: Dir
    icons?: Icon[]
  }
  shortcuts?: {
    name: string
    url: Path | Url
    description?: string
    icons?: Icon[]
  }[]
  related_apps?: {
    platform: AppPlatform
    url: Url
  }[]
  prefer_related_apps?: boolean
  iarc_rating_id?: string
  screenshots?: Path[] | Url[]
}

export default Pwa
export { Icon }
