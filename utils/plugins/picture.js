const Image = require('@11ty/eleventy-img')

const defaultOptions = {
  widths: [640, 768, 1280, 1366, 1600],
  sizes: '',
  formats: ['webp', 'jpeg'],
  urlPath: '/assets/',
  outputDir: './_site/assets/'
}

module.exports = async (document, options) => {
  options = Object.assign({}, defaultOptions, options)
  
  if (options.sizes.length === 0) throw new Error('"sizes" for the picture plugin is not defined.')
  
  const images = [...document.querySelectorAll('figure')]
  
  for (let i of images) {
    const img = i.querySelector('img')
    const src = img.getAttribute('src')
    
    const stats = await Image(src, options)
    
    i.outerHTML = `
    <figure><picture>
      <source type="image/webp" sizes="${options.sizes}" srcset="${stats.webp.map(p => p.srcset).join(', ')}">
      <source type="image/jpeg" sizes="${options.sizes}" srcset="${stats.jpeg.map(p => p.srcset).join(', ')}">
      <img src="${src}" height="${img.getAttribute('height')}" width="${img.getAttribute('width')}" alt="${img.getAttribute('alt')}">
    </picture></figure>`
  }

}