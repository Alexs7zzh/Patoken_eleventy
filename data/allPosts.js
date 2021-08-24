const GhostContentAPI = require('@tryghost/content-api')
const { AssetCache } = require('@11ty/eleventy-cache-assets')
const { parseHTML } = require('linkedom')

/* global process */
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API,
  version: 'v3'
})

const fetchPosts = async () => {
  let asset = new AssetCache('all_posts')
  if (asset.isCacheValid('1d')) return asset.getCachedValue()

  let result = await api.posts.browse({ include: 'tags,authors' })
  for (let i of result) {
    let { document } = parseHTML(i.html)
    for(let node of document.querySelectorAll('h2')) {
      const content = node.textContent
      const h3 = document.createElement('h3')
      h3.textContent = content
      document.replaceChild(h3, node)
    }
    i.html = document.toString()
  }
  await asset.save(result, 'json')

  return result
}

module.exports = fetchPosts