if (process.env.VERCEL !== '1') require('dotenv').config()

const addPlugins = require('./client/utils/plugins')
const addFilters = require('./client/utils/filters')
const addTransforms = require('./client/utils/transforms')

module.exports = config => {
  addPlugins(config)
  addFilters(config)
  addTransforms(config)

  config.setTemplateFormats('njk')
  config.setBrowserSyncConfig({
    ui: false,
    ghostMode: false
  })
  
  return {
    dir: {
      includes: "client/includes",
      data: "client/data"
    }
  }
}
