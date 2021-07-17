const GhostContentAPI = require('@tryghost/content-api')

/* global process */
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API,
  version: 'v3'
})

// const allPosts = async () => {
//   return await api.posts.browse({ include: 'tags,authors' })
// }

module.exports = api.posts.browse({ include: 'tags,authors' })