/* global process */
module.exports = config => {
  if (process.env.ELEVENTY_ENV) {
    const minify = require('html-minifier').minify
    config.addTransform('minifyHtml', (content, outputPath) => {
      if (outputPath && outputPath.endsWith('.html')) 
        content = minify(content, {
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeComments: true,
          sortClassName: true,
          sortAttributes: true,
          html5: true,
          decodeEntities: true,
          minifyJS: true
        })
      
      return content
    })
  }
}
