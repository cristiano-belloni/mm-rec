const waterfall = require('async/waterfall')
const partial = require('lodash/partial')
const log = require('../../logger')
const getPrice = require('./get-price')
const getStories = require('./get-stories')
const analyseSentiment = require('./../../analyse-sentiment')

module.exports = (request, response) => {
  const ticker = request.params.ticker
  if (!ticker) {
    log.error('Ticker not found in request', request)
    response.status(400)
    return response.json({ error: 'Bad parameters' })
  }
  log.info(`Getting data for company ${ticker}`)
  waterfall([
    partial(getPrice, request.params.ticker),
    getStories
  ], (error, result) => {
    const data = result
    if (error) {
      response.status(500)
      return response.json({ error })
    }
    data.stories = result.stories.map((story) => ({
      id: story.id,
      headline: story.headline,
      body: story.body,
      sentiment: analyseSentiment(story.body)
    }))
    response.status(200)
    return response.json(data)
  })
}
