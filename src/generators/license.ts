import { writeFileSync } from 'atomically'
import spdxLicenseList from 'spdx-license-list/full'
import { Config } from '../types/main.d'

const generateLicenseTxt = (config: Config): void | string => {
  const year = new Date().getFullYear().toString()
  const { publisher, settings } = config
  const { license } = settings

  if (license && year && publisher && publisher.name) {
    const licenseText = spdxLicenseList[license].licenseText
      .replace('<year>', year)
      .replace('<copyright holders>', publisher.name)

    if (require.main === module) {
      writeFileSync(`${process.cwd()}/LICENSE.txt`, licenseText, { fsyncWait: false })
    } else {
      return licenseText
    }
  }
}

export default generateLicenseTxt
