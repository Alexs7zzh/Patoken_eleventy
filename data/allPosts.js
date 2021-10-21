const GhostContentAPI = require('@tryghost/content-api')
const { parseHTML } = require('linkedom')
const { AssetCache } = require('@11ty/eleventy-cache-assets')

/* global process */
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API,
  version: 'v3'
})

const fetchPosts = async () => {
  let asset = null
  if (process.env.VERCEL !== '1') {
    asset = new AssetCache('all_posts')
    if (asset.isCacheValid('1d')) return asset.getCachedValue()
  }
  
  let result = await api.posts.browse({ limit: 'all', include: 'tags,authors' })
  for (let i of result) {
    // TODO title reformat
    let match = i.title.match(/\d{4}\/(\d{1,2}\/\d{1,2})/)
    if (match) i.title = match[1]
      
    let { document } = parseHTML(i.html)
    for(let node of document.querySelectorAll('h2')) {
      const content = node.textContent
      const h3 = document.createElement('h3')
      h3.textContent = content
      document.replaceChild(h3, node)
    }
    i.html = document.toString()
  }

  if (process.env.VERCEL !== '1') await asset.save(result, 'json')

  return result
}

module.exports = fetchPosts