const GhostContentAPI = require('@tryghost/content-api')
const { AssetCache } = require('@11ty/eleventy-cache-assets')

/* global process */
const api = new GhostContentAPI({
  url: "https://ghost.patoken.org", //process.env.GHOST_URL,
  key: "231c7110e7708251aab20ff9bf", //process.env.GHOST_API,
  version: 'v3'
})

const fetchPosts = async () => {
  let asset = new AssetCache('all_posts')
  if (asset.isCacheValid('1d')) return asset.getCachedValue()

  let result = await api.posts.browse({ include: 'tags,authors' })
  await asset.save(result, 'json')

  return result
}

module.exports = fetchPosts