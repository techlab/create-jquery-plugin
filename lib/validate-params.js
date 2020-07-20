'use strict'

const which           = require('which')
const path            = require('path')
const fs              = require("fs");
const validateNpmName = require('validate-npm-package-name')

module.exports.validateName = async (name) => {
  if (name) {
    const validate = validateNpmName(name)
    if (validate.validForNewPackages) {
      if (fs.existsSync(path.resolve(process.cwd(), name))) {
        return 'The directory already exists'
      }
      return true
    } else {
      if (validate.errors) {
        return validate.errors.join(', ')
      }
      if (validate.warnings) {
        return validate.warnings.join(', ')
      }
    }
  } else {
    return 'Please enter a name for your Package'
  }

  return false
}

module.exports.validateManager = async (manager) => {
  if (manager) {
    if (which.sync(manager, { nothrow: true })) {
      return true
    } else {
      return manager + ' not installed'
    }
  } else {
    return 'Please select your Package Manager'
  }
}
