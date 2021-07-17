const { DateTime } = require('luxon')
const GhostContentAPI = require('@tryghost/content-api')

/* global process */
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API,
  version: 'v3'
})

module.exports = config => {
  config.addFilter('shortDate', date => {
    return DateTime.fromISO(date).toFormat('MM/dd') // toFormat('DDD')
  })
  
  config.addNunjucksAsyncFilter('getPostsByAuthor', async (author, callback) => {
    const result = await api.posts.browse({ include: 'tags,authors', filter: `author:${author}` })
    callback(null, result)
  })
}
