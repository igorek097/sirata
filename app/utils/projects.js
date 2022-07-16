var client = require('./contentfulClient').client

function getProjects (data_type) {
  return client.getEntries({'content_type': data_type})
}

function getProject (entry_id) {
  return client.getEntry(entry_id)
}

// function getProject (slug, query) {
//   // little trick to get an entry with include
//   // this way all linked items will be resolved for us
//   query = query || {}
//   query['content_type'] = 'project'
//   // query['fields.slug'] = slug
//   return client.getEntries(query)
// }

// function getProjects (query) {
//   query = query || {}
//   query.content_type = 'product'
//   return client.getEntries(query)
// }

module.exports = {
  getProject,
  getProjects
}