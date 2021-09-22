const validPwa = require('../../dist/validators/pwa.js').default
const { validationErrors, errorOutput, clearErrors } = require('../../dist/errors.js')

test('pwa - no object', () => {
  clearErrors()

  expect(validPwa()).toBe(false)
})

test('pwa - valid short_name', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com'
    })
  ).toBe(true)
})

test('pwa - invalid short_name', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'this is not a short name it is a long name',
      start_url: 'https://example.com'
    })
  ).toBe(false)
})

test('pwa - no short_name', () => {
  clearErrors()

  expect(
    validPwa({
      start_url: 'https://example.com'
    })
  ).toBe(false)
})

test('pwa - valid start_url', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com'
    })
  ).toBe(true)
})

test('pwa - invalid start_url', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'httpl://example.com'
    })
  ).toBe(false)
})

test('pwa - no start_url', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname'
    })
  ).toBe(false)
})

test('pwa - valid categories', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      categories: ['one', 'two', 'three']
    })
  ).toBe(true)
})

test('pwa - invalid categories', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      categories: [123, 456, 'three']
    })
  ).toBe(false)
})

test('pwa - invalid categories type', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      categories: 'string'
    })
  ).toBe(false)
})

test('pwa - valid scope (path)', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      scope: '/'
    })
  ).toBe(true)
})

test('pwa - valid scope (URL)', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      scope: 'https://example.com'
    })
  ).toBe(true)
})

test('pwa - invalid scope', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      scope: 'example.com'
    })
  ).toBe(false)
})

test('pwa - valid appearance', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {}
    })
  ).toBe(true)
})

test('pwa - valid appearance.display_mode', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        display_mode: 'fullscreen'
      }
    })
  ).toBe(true)
})

test('pwa - invalid appearance.display_mode', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        display_mode: 'off'
      }
    })
  ).toBe(false)
})

test('pwa - valid appearance.background_color', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        background_color: '#ffffff'
      }
    })
  ).toBe(true)
})

test('pwa - invalid appearance.background_color', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        background_color: '#XXXYYY'
      }
    })
  ).toBe(false)
})

test('pwa - valid appearance.theme_color', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        theme_color: '#ffffff'
      }
    })
  ).toBe(true)
})

test('pwa - invalid appearance.theme_color', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        theme_color: '#XXXYYY'
      }
    })
  ).toBe(false)
})

test('pwa - valid appearance.orientation', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        orientation: 'any'
      }
    })
  ).toBe(true)
})

test('pwa - invalid appearance.orientation', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        orientation: 'off'
      }
    })
  ).toBe(false)
})

test('pwa - valid appearance.text_direction', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        text_direction: 'rtl'
      }
    })
  ).toBe(true)
})

test('pwa - invalid appearance.text_direction', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        text_direction: 'off'
      }
    })
  ).toBe(false)
})

test('pwa - valid appearance.icons', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        icons: [
          {
            src: 'https://example.com/icon.png',
            size: '48x48',
            type: 'image/png'
          }
        ]
      }
    })
  ).toBe(true)
})

test('pwa - invalid appearance.icons', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: {
        icons: [
          {
            src: 'https://example.com/icon.png'
          }
        ]
      }
    })
  ).toBe(false)
})

test('pwa - invalid appearance type', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      appearance: 'hello'
    })
  ).toBe(false)
})

test('pwa - valid shortcuts', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: [
        {
          name: 'name',
          url: 'https://example.com',
          description: 'description',
          icons: [
            {
              src: 'https://example.com/icon.png',
              size: '48x48',
              type: 'image/png'
            }
          ]
        }
      ]
    })
  ).toBe(true)
})

test('pwa - invalid shortcuts', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: [
        {
          url: 'https://example.com',
          description: 'description'
        }
      ]
    })
  ).toBe(false)
})

test('pwa - valid shortcuts.url', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: [
        {
          name: 'name',
          url: 'https://example.com',
          description: 'description'
        }
      ]
    })
  ).toBe(true)
})

test('pwa - invalid shortcuts.url', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: [
        {
          name: 'name',
          url: 'httpl://example.com',
          description: 'description'
        }
      ]
    })
  ).toBe(false)
})

test('pwa - valid shortcuts.description', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: [
        {
          name: 'name',
          url: 'https://example.com',
          description: 'description'
        }
      ]
    })
  ).toBe(true)
})

test('pwa - invalid shortcuts.description', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: [
        {
          name: 'name',
          url: 'httpl://example.com',
          description: null
        }
      ]
    })
  ).toBe(false)
})

test('pwa - invalid shortcuts type', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: 'string'
    })
  ).toBe(false)
})

test('pwa - invalid shortcuts array items', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      shortcuts: ['string']
    })
  ).toBe(false)
})

test('pwa - valid related_apps', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: [
        {
          platform: 'play',
          url: 'https://example.com'
        }
      ]
    })
  ).toBe(true)
})

test('pwa - invalid related_apps', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: [
        {
          platform: 'play'
        }
      ]
    })
  ).toBe(false)
})

test('pwa - valid related_apps.related_app', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: [
        {
          platform: 'play',
          url: 'https://example.com'
        }
      ]
    })
  ).toBe(true)
})

test('pwa - invalid related_apps.related_app type', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: ['play']
    })
  ).toBe(false)
})

test('pwa - valid related_apps.related_app.platform', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: [
        {
          platform: 'play',
          url: 'https://example.com'
        }
      ]
    })
  ).toBe(true)
})

test('pwa - invalid related_apps.related_app.platform', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: [
        {
          platform: 'google',
          url: 'https://example.com'
        }
      ]
    })
  ).toBe(false)
})

test('pwa - valid related_apps.related_app.url', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: [
        {
          platform: 'play',
          url: 'https://example.com'
        }
      ]
    })
  ).toBe(true)
})

test('pwa - invalid related_apps.related_app.url', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: [
        {
          platform: 'play',
          url: 'example.com'
        }
      ]
    })
  ).toBe(false)
})

test('pwa - invalid related_apps type', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      related_apps: {}
    })
  ).toBe(false)
})

test('pwa - valid prefer_related_apps', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      prefer_related_apps: true
    })
  ).toBe(true)
})

test('pwa - invalid prefer_related_apps', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      prefer_related_apps: 123456
    })
  ).toBe(false)
})

test('pwa - valid iarc_rating_id', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      iarc_rating_id: 'string'
    })
  ).toBe(true)
})

test('pwa - invalid iarc_rating_id', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      iarc_rating_id: 123456
    })
  ).toBe(false)
})

test('pwa - valid screenshots', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      screenshots: ['http://whatever.com/file.png']
    })
  ).toBe(true)
})

test('pwa - invalid screenshots type', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      screenshots: 'string'
    })
  ).toBe(false)
})

test('pwa - invalid screenshots.screenshot', () => {
  clearErrors()

  expect(
    validPwa({
      short_name: 'shortname',
      start_url: 'https://example.com',
      screenshots: ['string']
    })
  ).toBe(false)
})
