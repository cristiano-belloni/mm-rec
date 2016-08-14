const mongoConnect = require('../../mongo-connect')
const log = require('../../logger')

module.exports = (request, response) => {
  const collection = mongoConnect.getDb().collection('company')
  log.info('Getting companies from DB')
  collection.find({}, { _id: 0 })
    .toArray().then((companies) => {
      if (!companies.length) {
        response.status(404)
        return response.json([])
      }
      response.status(200)
      return response.json(companies)
    }).catch((error) => {
      response.status(500)
      return response.json({ error })
    })
}
