const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const unitPath = '../../../../../server/controllers/company/get-price'

function getRequestMock (error, response, body) {
  return sinon.stub().yields(error, response, body)
}

test('get-price returns an error', function (t) {
  t.plan(1)
  const errorMock = 'ERROR_MOCK_1'
  const requestMock = getRequestMock(errorMock)
  const getPrice = proxyquire(unitPath, {
    'request': requestMock
  })
  const url = 'mockUrl1'
  getPrice(url, (error) => {
    t.equal(error, errorMock)
  })
})

test('get-price returns a non-200 statusCode', function (t) {
  t.plan(1)
  const statusCode = 500
  const requestMock = getRequestMock(null, {statusCode})
  const getPrice = proxyquire(unitPath, {
    'request': requestMock
  })
  const url = 'mockUrl2'
  getPrice(url, (error) => {
    t.equal(error, `Price service returned ${statusCode}`)
  })
})

test('get-price returns a non-parsable body', function (t) {
  t.plan(1)
  const statusCode = 200
  const mockBody = 'I AM NOT JSON'
  const requestMock = getRequestMock(null, {statusCode}, mockBody)
  const getPrice = proxyquire(unitPath, {
    'request': requestMock
  })
  const url = 'mockUrl3'
  getPrice(url, (error) => {
    t.equal(error, 'Can not parse response from price service')
  })
})

test('get-price returns a parsable body', function (t) {
  t.plan(2)
  const statusCode = 200
  const bodyMock = {
    I: {
      am: 'json'
    }
  }
  const requestMock = getRequestMock(null, {statusCode}, JSON.stringify(bodyMock))
  const getPrice = proxyquire(unitPath, {
    'request': requestMock
  })
  const url = 'mockUrl4'
  getPrice(url, (error, res) => {
    t.equal(error, null)
    t.deepEqual(res, bodyMock)
  })
})
