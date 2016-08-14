const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const controllerPath = '../../../../../server/controllers/companies'

function getMongoMock (response, catchResponse) {
  const catchStub = sinon.stub()
  if (catchResponse) catchStub.yields(catchResponse)
  const thenStub = sinon.stub().returns({catch: catchStub})
  if (response) thenStub.yields(response)
  const toArrayStub = sinon.stub().returns({then: thenStub})
  const findStub = sinon.stub().returns({toArray: toArrayStub})
  const collectionStub = sinon.stub().returns({find: findStub})
  const getDb = sinon.stub().returns({collection: collectionStub})
  return { getDb }
}

test('find returns empty array', function (t) {
  t.plan(3)
  const mongoMock = getMongoMock([])
  const statusSpy = sinon.spy()
  const companiesController = proxyquire(controllerPath, {
    '../../mongo-connect': mongoMock
  })
  companiesController(null,
    {
      status: statusSpy,
      json: (res) => {
        t.equal(statusSpy.calledOnce, true)
        t.equal(statusSpy.calledWith(404), true)
        t.deepEqual(res, [])
      }
    }
  )
})

test('find returns non-empty array', function (t) {
  t.plan(3)
  const resMock = ['RESPONSE']
  const statusSpy = sinon.spy()
  const mongoMock = getMongoMock(resMock)
  const companiesController = proxyquire(controllerPath, {
    '../../mongo-connect': mongoMock
  })
  companiesController(null,
    {
      status: statusSpy,
      json: (res) => {
        t.equal(statusSpy.calledOnce, true)
        t.equal(statusSpy.calledWith(200), true)
        t.deepEqual(res, resMock)
      }
    }
  )
})

test('find returns error', function (t) {
  t.plan(3)
  const errMock = 'ERROR_MOCK'
  const statusSpy = sinon.spy()
  const mongoMock = getMongoMock(undefined, errMock)
  const companiesController = proxyquire(controllerPath, {
    '../../mongo-connect': mongoMock
  })
  companiesController(null,
    {
      status: statusSpy,
      json: (res) => {
        t.equal(statusSpy.calledOnce, true)
        t.equal(statusSpy.calledWith(500), true)
        t.deepEqual(res, { error: errMock })
      }
    }
  )
})
