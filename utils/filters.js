const fs = require('fs')

module.exports = config => {
  config.addFilter('isActive', (slug, url) => url.includes(slug))

  config.addFilter('svg', path => {
    const data = fs.readFileSync(path)
    return data.toString('utf8')
  })

  config.addFilter('getName', name => {
    return name.split(' ')[0]
  })

  config.addFilter('getPostsByAuthor', (author, posts) => {
    posts = posts.filter(i => {
      let flag = false
      for(let j of i.authors)
        if (j.slug === author) flag = true
      return flag
    })
    return posts
  })

  config.addFilter('getPostsByTag', (tag, posts) => {
    posts = posts.filter(i => {
      let flag = false
      for(let j of i.tags)
        if (j.slug === tag) flag = true
      return flag
    })
    return posts
  })
}
