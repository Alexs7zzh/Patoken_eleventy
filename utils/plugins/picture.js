const Image = require('@11ty/eleventy-img')

const defaultOptions = {
  widths: [768, 1280, 1600, null],
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
    <figure>
    <picture>
      <source type="image/webp" sizes="${options.sizes}" srcset="${stats.webp.map(p => p.srcset).join(', ')}">
      <source type="image/jpeg" sizes="${options.sizes}" srcset="${stats.jpeg.map(p => p.srcset).join(', ')}">
      <img src="${stats.jpeg[stats.jpeg.length - 1].url}" height="${img.getAttribute('height')}" width="${img.getAttribute('width')}" alt="${img.getAttribute('alt')}">
    </picture>
    <figcaption>画像をクリックすると拡大できる</figcaption>
    </figure>`
  }

}