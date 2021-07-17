const GhostContentAPI = require('@tryghost/content-api')

/* global process */
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API,
  version: 'v3'
})

const fetchAuthors = async () => {
  const result = await api.authors.browse()
  return result.slice(0, result.length)
}

module.exports = fetchAuthors