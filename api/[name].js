const got = require('got')

module.exports = async (req, res) => {
  const { name } = req.query
  
  let json = await got('https://api.hypothes.is/api/search', {
    searchParams: {
      limit: 200, // [0..200]
      sort: 'created', // Enum: "created" "updated" "group" "id" "user"
      order: 'asc', // Enum: "asc" "desc"
      uri: `https://patoken.org/${name}/`,
      group: '1897wzdA'
      // _separate_replies=false
    },
    headers: {
      authorization: `Bearer ${process.env.HYPOTHESIS_API}`,
      'content-type': 'application/json'
    }
  }).json()

  json = json.rows.map(i => ({
      id: i.id,
      created: i.created,
      updated: i.updated,
      text: i.text,
      user: i.user,
      target: i.target[0].selector,
      user_info: i.user_info.display_name,
      references: i.references[0]
    })) // user, tags

  json
    .filter(i => i.references !== undefined)
    .slice().reverse()
    .forEach(i => {
      const index = json.map(j => j.id).indexOf(i.references)
      if (index >= 0) {
        if (json[index].comment === undefined) json[index].comment = []
        json[index].comment.push(i)
      }
    })

  return res.json(json.filter(i => i.references === undefined))
}