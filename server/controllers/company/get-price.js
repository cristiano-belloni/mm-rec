const config = require('config')
const priceUrl = config.get('priceUrl')
const request = require('request')
const log = require('../../logger')

module.exports = (tickerCode, cb) => {
  const url = `${priceUrl}/${tickerCode}`
  log.info(`Calling price service at ${url}`)
  request(url, function (error, response, body) {
    if (error) return cb(error)
    if (response.statusCode !== 200) return cb(`Price service returned ${response.statusCode}`)
    try {
      const priceObj = JSON.parse(body)
      cb(null, priceObj)
    } catch (e) {
      cb('Can not parse response from price service')
    }
  })
}
