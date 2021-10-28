const fs = require('fs')
const { DateTime } = require('luxon')

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

  config.addFilter('sortByYear', posts => {
    let yearSet = new Set()
    posts.forEach(item => {
      yearSet.add(DateTime.fromISO(item.published_at).year)
    })
    return [...yearSet]
      .sort((a, b) => b - a)
      .map(year => [
        year,
        posts
          .filter(item => DateTime.fromISO(item.published_at).year == year)
          .sort((a, b) => b.published_at - a.published_at)
      ])
  })
}
