const GhostContentAPI = require('@tryghost/content-api')
const { AssetCache } = require('@11ty/eleventy-cache-assets')

/* global process */
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API,
  version: 'v3'
})

const fetchTags = async () => {
  let asset = null
  if (process.env.VERCEL !== '1') {
    asset = new AssetCache('all_tags')
    if (asset.isCacheValid('1d')) return asset.getCachedValue() 
  }

  let result = await api.tags.browse()
  result = result.filter(i => i.name !== 'dream')
  
  if (process.env.VERCEL !== '1') await asset.save(result, 'json')

  return result
}

module.exports = fetchTags