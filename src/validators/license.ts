import spdxLicenseList from 'spdx-license-list'

const validLicense = (license: string): boolean => {
  return spdxLicenseList[license] !== undefined
}

export default validLicense
