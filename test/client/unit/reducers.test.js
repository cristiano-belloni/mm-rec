import test from 'tape'
import rewire from 'rewire'
const reducers = rewire('../../../client/reducers')
import {
  UPDATE_COMPANY_LIST,
  UPDATE_COMPANY,
  FETCHING_COMPANY_LIST_START,
  FETCHING_COMPANY_LIST_END,
  FETCHING_COMPANY_START,
  FETCHING_COMPANY_END,
  SET_ALT_MESSAGE,
  SET_ERROR_ALERT,
  CLEAR_ALT_MESSAGE,
  CLEAR_ERROR_ALERT
} from '../../../client/actions'

test('companyList reducer', function (t) {
  const companyList = reducers.__get__('companyList')
  let newState
  t.plan(3)
  newState = companyList(undefined, { type: 'UNKNOWN_ACTION' })
  t.deepEqual(newState, [])
  newState = companyList(undefined, { type: UPDATE_COMPANY_LIST, companyList: [1, 2, 3] })
  t.deepEqual(newState, [1, 2, 3])
  newState = companyList([3, 4, 5], { type: 'UNKNOWN_ACTION' })
  t.deepEqual(newState, [3, 4, 5])
})

test('currentCompany reducer', function (t) {
  const currentCompany = reducers.__get__('currentCompany')
  let newState
  t.plan(3)
  newState = currentCompany(undefined, { type: 'UNKNOWN_ACTION' })
  t.equal(newState, null)
  newState = currentCompany(undefined, { type: UPDATE_COMPANY, companyObj: { an: 'object' } })
  t.deepEqual(newState, { an: 'object' })
  newState = currentCompany({ another: 'object' }, { type: 'UNKNOWN_ACTION' })
  t.deepEqual(newState, { another: 'object' })
})

test('altMessage reducer', function (t) {
  const altMessage = reducers.__get__('altMessage')
  let newState
  t.plan(4)
  newState = altMessage(undefined, { type: 'UNKNOWN_ACTION' })
  t.equal(newState, null)
  newState = altMessage(undefined, { type: SET_ALT_MESSAGE, message: 'a message' })
  t.equal(newState, 'a message')
  newState = altMessage('another message', { type: 'UNKNOWN_ACTION' })
  t.equal(newState, 'another message')
  newState = altMessage('to be cleared', { type: CLEAR_ALT_MESSAGE })
  t.equal(newState, null)
})

test('errorAlert reducer', function (t) {
  const errorAlert = reducers.__get__('errorAlert')
  let newState
  t.plan(4)
  newState = errorAlert(undefined, { type: 'UNKNOWN_ACTION' })
  t.equal(newState, null)
  newState = errorAlert(undefined, { type: SET_ERROR_ALERT, error: 'an error' })
  t.equal(newState, 'an error')
  newState = errorAlert('another error', { type: 'UNKNOWN_ACTION' })
  t.equal(newState, 'another error')
  newState = errorAlert('to be cleared', { type: CLEAR_ERROR_ALERT })
  t.equal(newState, null)
})

test('isMainFetching reducer', function (t) {
  const isMainFetching = reducers.__get__('isMainFetching')
  let newState
  t.plan(6)
  newState = isMainFetching(undefined, { type: 'UNKNOWN_ACTION' })
  t.equal(newState, 0)
  newState = isMainFetching(undefined, { type: FETCHING_COMPANY_LIST_START })
  t.equal(newState, 1)
  newState = isMainFetching(1000, { type: FETCHING_COMPANY_LIST_START })
  t.equal(newState, 1001)
  newState = isMainFetching(1488, { type: 'UNKNOWN_ACTION' })
  t.equal(newState, 1488)
  newState = isMainFetching(undefined, { type: FETCHING_COMPANY_LIST_END })
  t.equal(newState, -1)
  newState = isMainFetching(1000, { type: FETCHING_COMPANY_LIST_END })
  t.equal(newState, 999)
})

test('isCompanyFetching reducer', function (t) {
  const isCompanyFetching = reducers.__get__('isCompanyFetching')
  let newState
  t.plan(6)
  newState = isCompanyFetching(undefined, { type: 'UNKNOWN_ACTION' })
  t.equal(newState, 0)
  newState = isCompanyFetching(undefined, { type: FETCHING_COMPANY_START })
  t.equal(newState, 1)
  newState = isCompanyFetching(1000, { type: FETCHING_COMPANY_START })
  t.equal(newState, 1001)
  newState = isCompanyFetching(1488, { type: 'UNKNOWN_ACTION' })
  t.equal(newState, 1488)
  newState = isCompanyFetching(undefined, { type: FETCHING_COMPANY_END })
  t.equal(newState, -1)
  newState = isCompanyFetching(1000, { type: FETCHING_COMPANY_END })
  t.equal(newState, 999)
})

