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
