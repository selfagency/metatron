declare enum RunMode {
  generator = 'generator',
  middleware = 'middleware'
}

interface Settings {
  mode?: RunMode
  expiry?: number
}

export default Settings
