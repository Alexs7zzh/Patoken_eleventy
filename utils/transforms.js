const { parseHTML } = require('linkedom')

module.exports = config => {

  config.addTransform('transform', async (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      let { document } = parseHTML(content)
      
      const elements = document.querySelectorAll('a[download]')
      for (const ele of elements) {
        const href = ele.getAttribute('href').replace('https://ghost.patoken.org', '')
        ele.setAttribute('href', href)
      }

      // if (process.env.ELEVENTY_ENV)
        await require('./plugins/picture')(document, {
          sizes: '(max-width: 648px) 100vw, 750px'
        })

      return `<!DOCTYPE html>${document.documentElement.outerHTML}`
    }
    return content
  })

  /* global process */
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
          decodeEntities: true
        })
      
      return content
    })
  }
}
