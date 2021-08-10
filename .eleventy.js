if (!process.env.ELEVENTY_ENV) require('dotenv').config()

const addPlugins = require('./utils/plugins')
const addFilters = require('./utils/filters')
const addTransforms = require('./utils/transforms')

module.exports = config => {
  addPlugins(config)
  addFilters(config)
  addTransforms(config)

  config.setDataDeepMerge(true)
  config.setTemplateFormats('njk')

  config.setBrowserSyncConfig({
    ui: false,
    ghostMode: false
  })
  
  return {
    dir: {
      includes: "layouts",
      data: "data"
    }
  }
}
