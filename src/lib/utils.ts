import consola from 'consola'

const logger = consola.create({})

const genDate = () => {
  return new Date().toLocaleDateString()
}

export { genDate, logger }
