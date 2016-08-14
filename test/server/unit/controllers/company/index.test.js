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

test.only('no ticker', function (t) {
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
