const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const unitPath = '../../../../../server/controllers/company/get-stories'

function getRequestMock (error, response, body) {
  return sinon.stub().yields(error, response, body)
}

test('get-stories without an url', function (t) {
  t.plan(1)
  const requestMock = getRequestMock()
  const getStories = proxyquire(unitPath, {
    'request': requestMock
  })
  const priceObj = {}
  getStories(priceObj, (error) => {
    t.equal(error, 'Story service URL not found')
  })
})

test('get-stories returns an error', function (t) {
  t.plan(1)
  const errorMock = 'ERROR_MOCK_1'
  const requestMock = getRequestMock(errorMock)
  const getStories = proxyquire(unitPath, {
    'request': requestMock
  })
  const priceObj = {storyFeedUrl: 'mockUrl1'}
  getStories(priceObj, (error) => {
    t.equal(error, errorMock)
  })
})

test('get-stories returns a non-200 statusCode', function (t) {
  t.plan(1)
  const statusCode = 500
  const requestMock = getRequestMock(null, {statusCode})
  const getStories = proxyquire(unitPath, {
    'request': requestMock
  })
  const priceObj = {storyFeedUrl: 'mockUrl2'}
  getStories(priceObj, (error) => {
    t.equal(error, `Story service returned ${statusCode}`)
  })
})

test('get-stories returns a non-parsable body', function (t) {
  t.plan(1)
  const statusCode = 200
  const mockBody = 'I AM NOT JSON'
  const requestMock = getRequestMock(null, {statusCode}, mockBody)
  const getStories = proxyquire(unitPath, {
    'request': requestMock
  })
  const priceObj = {storyFeedUrl: 'mockUrl3'}
  getStories(priceObj, (error) => {
    t.equal(error, 'Can not parse response from story service')
  })
})

test('get-stories returns a parsable body', function (t) {
  t.plan(2)
  const statusCode = 200
  const bodyMock = {
    I: {
      am: 'json'
    }
  }
  const requestMock = getRequestMock(null, {statusCode}, JSON.stringify(bodyMock))
  const getStories = proxyquire(unitPath, {
    'request': requestMock
  })
  const priceObj = {otherStuff: 'other', storyFeedUrl: 'mockUrl3'}
  getStories(priceObj, (error, res) => {
    t.equal(error, null)
    t.deepEqual(res, Object.assign({}, priceObj, {stories: bodyMock}))
  })
})

