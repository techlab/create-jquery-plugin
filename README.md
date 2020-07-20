# create-jquery-plugin
#### CLI for creating ready-to-start modern jQuery Plugins
###### Inspired from [create-react-library](https://www.npmjs.com/package/create-react-library) and [create-react-app](https://github.com/facebook/create-react-app)


[![Build Status](https://travis-ci.org/techlab/create-jquery-plugin.svg?branch=master)](https://travis-ci.org/techlab/create-jquery-plugin)
[![npm version](https://badge.fury.io/js/create-jquery-plugin.svg)](https://www.npmjs.com/package/create-jquery-plugin)
[![Npm Downloadsl](https://badgen.net/npm/dm/create-jquery-plugin?icon=npm)](https://www.npmjs.com/package/create-jquery-plugin)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/techlab/create-jquery-plugin/master/LICENSE)
[![GitHub Repo](https://badgen.net/badge/icon/create-jquery-plugin?icon=github&label=&color=0da4d3)](https://github.com/techlab/create-jquery-plugin)
[![Donate on Paypal](https://img.shields.io/badge/PayPal-dipuraj-blue.svg)](https://www.paypal.me/dipuraj)


**create-jquery-plugin** is a CLI tool for creating a ready-to-start jQuery plugin development environment with modern configurations.
It will create a development environment with a pre-configured build system. So you can get started immediately with your plugin development.
Also, it is easily customizable that allows you to add or remove any tools or setup.
The development setup will include the boilerplate project for the jQuery plugin development, pre-configured gulp tasks for JavaScript transpile,
CSS/SCSS building, test/lint scripts, hot loading, example page, readme, etc.

+ [Homepage and Documentation](http://techlaboratory.net/create-jquery-plugin)
+ [GitHub Repository](https://github.com/techlab/create-jquery-plugin)
+ [GitHub Issues](https://github.com/techlab/create-jquery-plugin/issues)

Usage
-----

The command will walk you through a few simple prompts and creates a ready to start local development setup for your new jQuery plugin.

```bash
npx create-jquery-plugin
```

Or, fast track with default settings, just pass your plugin name.
```bash
npx create-jquery-plugin jquery-my-plugin
```

It will create a directory with the name of your package with all the tools installed.


How to start the development
-----
To start the development process, `cd` to your new plugin directory and run `npm start` or `yarn start`.
For example, if your new plugin is "jquery-my-plugin", just run

```bash
cd jquery-my-plugin
npm start
```

It will open the `example/index.html` file with [Browserify](http://browserify.org/) sync. You can start coding on the directory `src`, the example page will hot load as you make changes.

Features
-----
- Easy-to-use CLI.
- CSS and SCSS templates.
- Creates ready-to-start local development environment.
- Unit testing with [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/).

Directory structure
-----
The project boilerplate is from https://github.com/techlab/jquery-plugin-boilerplate
```
jquery-my-plugin
├── examples
│   └── index.html
├── node_modules
├── src
│   ├── js
│   │   └── jquery-plugin-boilerplate.js
│   └── scss
│       └── jquery-plugin-boilerplate.scss
├── test
│   ├── test-template.html
│   └── test.js
├── .gitignore
├── .npmignore
├── CONTRIBUTING.md
├── gulpfile.js
├── karma.conf.js
├── LICENSE
├── package.json
└── README.md
```

User Guide
----
Please find more detailed instructions and documentation [here](http://techlaboratory.net/create-jquery-plugin).

Acknowledgements
---
Grateful to the authors and contributers of [create-react-library](https://www.npmjs.com/package/create-react-library) and [create-react-app](https://github.com/facebook/create-react-app) from which this project is inspired.
Thankful to the [jquery-plugin-boilerplate](https://github.com/techlab/jquery-plugin-boilerplate) for providing the project templates. Also, thanks to the authors and contributors of the amazing Node.js tools used in this project.

License
----
Open source software licensed as [MIT](https://github.com/techlab/create-jquery-plugin/blob/master/LICENSE)

Contribute
----
If you like the project please support with your contribution.

[Donate on Paypal](https://www.paypal.me/dipuraj)

Thank you and Happy Coding :)
