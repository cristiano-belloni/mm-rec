const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const controllerPath = '../../../../../server/controllers/company'

function getPriceMock (error, response) {
  return sinon.stub().yields(error, response)
}

function getStoriesMock (error, response) {
  return sinon.stub().yields(error, response)
}

test('no ticker', function (t) {
  t.plan(3)
  const getCompany = require(controllerPath)
  const statusSpy = sinon.spy()
  const responseStub = {
    status: statusSpy,
    json: (data) => {
      t.equal(statusSpy.calledOnce, true)
      t.equal(statusSpy.calledWith(400), true)
      t.deepEqual(data, {error: 'Bad parameters'})
    }
  }

  getCompany({params: {}}, responseStub)
})

test('price service returns an error', function (t) {
  t.plan(3)
  const error = 'MOCK_ERROR'
  const getCompany = proxyquire(controllerPath,
    {
      './get-price': getPriceMock(error)
    })
  const statusSpy = sinon.spy()
  const responseStub = {
    status: statusSpy,
    json: (data) => {
      t.equal(statusSpy.calledOnce, true)
      t.equal(statusSpy.calledWith(500), true)
      t.deepEqual(data, {error})
    }
  }

  getCompany({params: {ticker: 'RNR'}}, responseStub)
})

test('story service returns an error', function (t) {
  t.plan(3)
  const error = 'MOCK_ERROR'
  const result = 'MOCK_RESULT'
  const getCompany = proxyquire(controllerPath,
    {
      './get-price': getPriceMock(null, result),
      './get-stories': getStoriesMock(error)
    })
  const statusSpy = sinon.spy()
  const responseStub = {
    status: statusSpy,
    json: (data) => {
      t.equal(statusSpy.calledOnce, true)
      t.equal(statusSpy.calledWith(500), true)
      t.deepEqual(data, {error})
    }
  }

  getCompany({params: {ticker: 'RNR'}}, responseStub)
})

test('both services return correctly', function (t) {
  t.plan(3)
  const resultPrice = {price: 1488}
  const resultStories = {
    stories: [
      {
        id: 1,
        headline: 'Headline neutral',
        body: 'this will result in a neutral sentiment'
      },
      {
        id: 2,
        headline: 'Headline positive',
        body: 'this will result in a positive sentiment grow grow grow grow'
      },
      {
        id: 3,
        headline: 'Headline negative',
        body: 'this will result in a negative sentiment drag drag drag drag drag'
      }
    ]
  }
  const getCompany = proxyquire(controllerPath,
    {
      './get-price': getPriceMock(null, resultPrice),
      './get-stories': getStoriesMock(null, resultStories)
    })
  const statusSpy = sinon.spy()
  const responseStub = {
    status: statusSpy,
    json: (data) => {
      t.equal(statusSpy.calledOnce, true)
      t.equal(statusSpy.calledWith(200), true)
      t.deepEqual(data, {
        stories: [{
          body: 'this will result in a neutral sentiment',
          headline: 'Headline neutral',
          id: 1,
          sentiment: 'neutral'
        }, {
          body: 'this will result in a positive sentiment grow grow grow grow',
          headline: 'Headline positive',
          id: 2,
          sentiment: 'positive'
        }, {
          body: 'this will result in a negative sentiment drag drag drag drag drag',
          headline: 'Headline negative',
          id: 3,
          sentiment: 'negative'
        }]
      })
    }
  }

  getCompany({params: {ticker: 'RNR'}}, responseStub)
})
