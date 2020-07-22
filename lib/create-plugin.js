'use strict'

const chalk       = require('chalk')
const handlebars  = require('handlebars')
const execa       = require('execa')
const fs          = require('fs')
const globby      = require('globby')
const mkdirp      = require('make-dir')
const ora         = require('ora')
const path        = require('path')
const pEachSeries = require('p-each-series')
const { validateManager }   = require('./validate-params')

module.exports = async (params) => {
  const dest = path.join(process.cwd(), params.shortName)
  params.dest = dest

  const source = path.join(__dirname, '..', 'templates', params.templateFolder)
  const files = await globby(source.replace(/\\/g, '/'), {
    dot: true
  })

  console.log(`
${chalk.dim.bold(`Creating jQuery plugin`)} ${chalk.green.bold(params.name)}`)

  // Create project folder
  await mkdirp(dest)

  // Copy template files
  {
    const promise = pEachSeries(files, async (file) => {
      const fileRelativePath  = path.relative(source, file).replace(/\\/g, '/')
      const destFilePath      = path.join(dest, fileRelativePath).replace(/jquery-plugin-boilerplate/gi, params.fileName)
      const destFileDir       = path.parse(destFilePath).dir
      await mkdirp(destFileDir)
      const template          = handlebars.compile(fs.readFileSync(file, 'utf8'))
      const content           = template({
        ...params
      })
      fs.writeFileSync(destFilePath, content, 'utf8')
      return fileRelativePath
    })
    ora.promise(promise, `Copy ${chalk.cyan(params.template)} template to ${chalk.cyan(params.shortName)}`)
    await promise
  }

  // Init git repository
  {
    const promise = execa('git', ['init'], { cwd: dest })
    ora.promise(promise, `Initialize git (${chalk.cyan(`git init`)}).`)
    await promise
  }

  // Install dependencies
  if (await validateManager(params.manager) === true) {
    const promise = execa(params.manager, ['install'], { cwd: dest })
    ora.promise(promise, `Install dependencies (${chalk.cyan(`${params.manager} install`)}). This will take a moment...`)
    await promise
  } else {
    ora(`Install dependencies error => ${chalk.cyan(`${params.manager}`)} not installed. Please install ${chalk.cyan(`${params.manager}`)} and then run ${chalk.cyan(`${params.manager} install`)} on your project directory`).fail();
  }

  return true
}
