'use strict'

const chalk             = require('chalk')
const getParams         = require('./get-params')
const createPlugin      = require('./create-plugin')
const { name, description, version } = require('../package')

module.exports = async () => {
  // Welcome message
  console.log(`
${chalk.yellow.bold(name)}${chalk.dim(`@${version}`)}
${chalk.italic(description)}`)

  // Get the package settings
  const params = await getParams()
  // console.log(params); process.exit(1);


  await createPlugin(params)

  // Result message
  console.log(`
${chalk.green.bold(`Your jQuery plugin has been created at`)} ${chalk.dim.bold(params.dest)}.
To get started, run: ${chalk.cyan(`cd ${params.shortName} && ${params.manager} start`)}

Happy Coding
`)

  return params
}

module.exports().catch((err) => {
  console.error(err)
  process.exit(1)
})
