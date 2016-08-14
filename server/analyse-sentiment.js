const splitWords = require('lodash/words')
const positiveWords = ['positive', 'success', 'grow', 'gains', 'happy', 'healthy']
const negativeWords = ['disappointing', 'concerns', 'decline', 'drag', 'slump', 'feared']

module.exports = (story) => {
  const wordArray = splitWords(story)
  let negCount = 0
  let posCount = 0
  wordArray.forEach((word) => {
    if (positiveWords.includes(word)) posCount += 1
    if (negativeWords.includes(word)) negCount += 1
  })
  const deltaSentiment = posCount - negCount
  const isPositive = deltaSentiment >= 0
  const isNeutral = isPositive && (deltaSentiment < 2)
  if (isNeutral) return 'neutral'
  if (isPositive) return 'positive'
  return 'negative'
}
