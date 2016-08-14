const test = require('tape')
const analyseSentiment = require('../../../server/analyse-sentiment.js')

test('negative story', function (t) {
  const result = analyseSentiment('disappointing concerns drag slump feared')
  t.plan(1)
  t.equal(result, 'negative')
})

test('negative story with positive and neutral terms', function (t) {
  const result = analyseSentiment('disappointing normal positive whatever concerns grow outside drag slump feared')
  t.plan(1)
  t.equal(result, 'negative')
})

test('negative story with punctuation', function (t) {
  const result = analyseSentiment('disappointing, normal positive whatever concerns! grow; outside: drag? "slump" feared')
  t.plan(1)
  t.equal(result, 'negative')
})

test('positive story', function (t) {
  const result = analyseSentiment('positive success grow')
  t.plan(1)
  t.equal(result, 'positive')
})

test('positive story with negative and neutral terms', function (t) {
  const result = analyseSentiment('positive whatever success grow disappointing happy drag')
  t.plan(1)
  t.equal(result, 'positive')
})

test('positive story with punctuation', function (t) {
  const result = analyseSentiment('positive? whatever success: grow, disappointing happy! drag')
  t.plan(1)
  t.equal(result, 'positive')
})

test('neutral story because it has no biased words', function (t) {
  const result = analyseSentiment('this story has no biased words and should be neutral')
  t.plan(1)
  t.equal(result, 'neutral')
})

test('neutral story because it has a zero score', function (t) {
  const result = analyseSentiment('success grow? disappointing drag!')
  t.plan(1)
  t.equal(result, 'neutral')
})

test('neutral story because it has a low positive score', function (t) {
  const result = analyseSentiment('success grow? disappointing!')
  t.plan(1)
  t.equal(result, 'neutral')
})

test('negative story when it has a high negative score', function (t) {
  const result = analyseSentiment('feared grow? disappointing!')
  t.plan(1)
  t.equal(result, 'negative')
})

test('negative story when repeating the same negative term', function (t) {
  const result = analyseSentiment('feared feared? feared! feared, happy success!')
  t.plan(1)
  t.equal(result, 'negative')
})

test('positive story when repeating the same positive term', function (t) {
  const result = analyseSentiment('feared happy happy happy happy happy happy')
  t.plan(1)
  t.equal(result, 'positive')
})
