const { parseHTML } = require('linkedom')
const minify = require('html-minifier').minify

/* global process */
module.exports = config => {
  config.addTransform('transform', async (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      let { document } = parseHTML(content)
      await require('./plugins/picture')(document, {
        sizes: '(max-width: 648px) 100vw, 750px'
      })
      return `<!DOCTYPE html>${document.documentElement.outerHTML}`
    }
    return content
  })

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
        decodeEntities: true
      })
    
    return content
  })
}
