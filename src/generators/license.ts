import is from '@sindresorhus/is'
import spdxLicenseList from 'spdx-license-list/full'
import renderTemplate from '../lib/renderer'
import { Config } from '../types/main.d'

const generateLicenseTxt = (config: Config): void | string => {
  const { publisher, settings } = config
  const { license } = settings

  if (!is.nullOrUndefined(license) && !is.nullOrUndefined(publisher)) {
    const data = {
      license: spdxLicenseList[license].licenseText
        .replace('<year>', new Date().getFullYear().toString())
        .replace('<copyright holders>', publisher.name),
      updated: process.env.NODE_ENV !== 'test' ? new Date().toISOString() : 'date goes here'
    }

    return renderTemplate('license', data, settings)
  } else {
    throw new Error('Cannot generate `license.txt` without license name and publisher')
  }
}

export default generateLicenseTxt
