if (process.env.VERCEL !== '1') require('dotenv').config()

const addPlugins = require('./utils/plugins')
const addFilters = require('./utils/filters')
const addTransforms = require('./utils/transforms')

module.exports = config => {
  addPlugins(config)
  addFilters(config)
  addTransforms(config)

  config.setTemplateFormats('njk')
  config.addPassthroughCopy('assets')
  config.setBrowserSyncConfig({
    ui: false,
    ghostMode: false
  })
  
  return {
    dir: {
      includes: "includes",
      data: "data"
    }
  }
}
