import { bold, cyan, red, yellow } from 'colorette'
import { logger } from './utils'

let validationErrors: Error[] = []

const catchErr = (objPath: string, required: boolean, expected?: string, received?: any) => {
  let newMsg = `${yellow(bold(objPath))}: `

  if (required) {
    newMsg = newMsg + red('[REQUIRED] ')
  }

  if (expected && received) {
    newMsg = newMsg + `Expected ${bold(expected)}, got <${bold(typeof received)}>: ${cyan(JSON.stringify(received))}`
  }

  const error = new Error(newMsg)
  if (process.env.DEBUG) logger.debug(error)
  validationErrors.push(error)
}

const errorOutput = () => {
  let i = 1
  const errors = validationErrors.map(err => `  ${i++}. ${err.message}`).join('\n')
  return `${red(bold('Metatron validation errors:'))}\n\n${errors}\n\nPlease resolve issues in ${bold(
    'metatron.yml'
  )} before proceeding.`
}

const clearErrors = () => {
  validationErrors = []
}

export { validationErrors, catchErr, errorOutput, clearErrors }
