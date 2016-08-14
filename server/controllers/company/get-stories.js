const request = require('request')
const log = require('../../logger')

module.exports = (priceObj, cb) => {
  const url = priceObj.storyFeedUrl
  if (!url) return cb('Story service URL not found')

  log.info(`Calling story service at ${url}`)
  request(url, function (error, response, body) {
    if (error) return cb(error)
    if (response.statusCode !== 200) return cb(`Story service returned ${response.statusCode}`)
    try {
      const stories = JSON.parse(body)
      const result = Object.assign({}, priceObj, { stories })
      cb(null, result)
    } catch (e) {
      cb('Can not parse response from story service')
    }
  })
}

