'use strict'

const chalk             = require('chalk')
const inquirer          = require('inquirer')
const camelCase         = require('camelcase')

const { validateName }  = require('./validate-params')
const { getDefaults, setDefaults } = require('./get-defaults')
const { getTemplateNames, getTemplateFolder } = require('./get-templates')

module.exports = async () => {
  const templatesNames  = await getTemplateNames()
  const defaults        = await getDefaults()
  let params            = defaults
  let args              = process.argv.slice(2)

  if (args.length === 1) {
    // If the package name is provided, create with defaults
    const packageName = args[0]
    const resPkg      = await validateName(packageName)
    if (resPkg === true) {
      params.name = packageName
    } else {
      console.log(`
${chalk.cyan(packageName)} => ${chalk.red(resPkg)}
`)
      process.exit(1)
    }
  } else {
    console.log(`
${chalk.dim.italic(`Walk you through creating your jQuery plugin.`)}
${chalk.dim(`Press ^C at any time to quit.`)}

${chalk.dim.italic(`Recommended "Package Name" format is`)} ${chalk.cyan.italic(`jquery-my-plugin`)}. ${chalk.dim.italic(`Ex.`)} ${chalk.cyan.italic(`jquery-smart-wizard`)}.`)

    // Start the prompt
    params  = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Package Name',
        validate: (name) => {
          return validateName(name)
        },
        default: defaults.name
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description',
        default: defaults.description
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: defaults.version
      },
      {
        type: 'input',
        name: 'author',
        message: "Author",
        default: defaults.author
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Repository',
        default: defaults.repo
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: defaults.license
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Package Manager',
        choices: ['npm', 'yarn'],
        default: defaults.manager
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: templatesNames,
        default: defaults.template
      }
    ])
  }

  // Handle scoped package names
  const parts           = params.name.split('/')
  params.shortName      = parts[parts.length - 1]

  // Resolve file, function and class names for the plugin
  params.fileName       = params.shortName

  params.functionName   = camelCase(params.shortName.replace('jquery',''))
  params.className      = params.shortName.replace('jquery','').toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
    return match.toUpperCase();
  }).replace(/-/g, '');

  // Get template folder
  params.templateFolder = await getTemplateFolder(params.template)

  setDefaults(params)
  return params
}
