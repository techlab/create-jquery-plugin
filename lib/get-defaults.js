'use strict'

const getGitConfigPath  = require('git-config-path')
const parseGitConfig    = require('parse-git-config')
const Conf              = require('conf')

module.exports.getDefaults = async () => {
  const config = new Conf()
  const defaults = {
    name: null,
    description: 'Made with create-jquery-plugin',
    version: '1.0.0',
    author: config.get('author'),
    repo: null,
    license: config.get('license', 'MIT'),
    manager: config.get('manager', 'npm'),
    template: config.get('template', 'JavaScript with CSS')
  }

  try {
    // Get the git user details
    if (!config.get('author')) {
      const gitConfigPath = getGitConfigPath('global')
      if (gitConfigPath) {
        const gitConfig = parseGitConfig.sync({ path: gitConfigPath })
        if (gitConfig.user && gitConfig.user.email) {
          defaults.author = ''
          if (gitConfig.user.name) {
            defaults.author += gitConfig.user.name
          }
          if (gitConfig.user.email) {
            defaults.author += ` <${gitConfig.user.email}>`
          }
          if (gitConfig.user.url) {
            defaults.author += ` (${gitConfig.user.url})`
          }

          config.set('author', defaults.author)
        }
      }
    }
  } catch (err) {}

  return defaults
}

module.exports.setDefaults = async (params) => {
  const config = new Conf()
  config.set('author', params.author)
  config.set('license', params.license)
  config.set('manager', params.manager)
  config.set('template', params.template)
}

module.exports.clearDefaults = async () => {
  const config = new Conf()
  config.clear()
}
