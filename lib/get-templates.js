'use strict'

const { templates } = require('../templates/templates')

module.exports.getTemplateNames = async () => {
  return templates.map(function(elem) {
      return elem.name;
  });
}

module.exports.getTemplateFolder = async (template) => {
  return templates.filter(function(elem) {
      return elem.name == template
  })[0].folder;
}
