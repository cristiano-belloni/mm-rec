import test from 'tape'
import rewire from 'rewire'
const actions = rewire('../../../client/actions')

test('serverBusyForList', function (t) {
  const serverBusyForList = actions.__get__('serverBusyForList')
  t.plan(1)
  t.deepEqual(serverBusyForList(), { type: actions.FETCHING_COMPANY_LIST_START })
})

test('serverFreeForList', function (t) {
  const serverFreeForList = actions.__get__('serverFreeForList')
  t.plan(1)
  t.deepEqual(serverFreeForList(), { type: actions.FETCHING_COMPANY_LIST_END })
})

test('serverBusyForCompany', function (t) {
  const serverBusyForCompany = actions.__get__('serverBusyForCompany')
  t.plan(1)
  t.deepEqual(serverBusyForCompany(), { type: actions.FETCHING_COMPANY_START })
})

test('serverFreeForCompany', function (t) {
  const serverFreeForCompany = actions.__get__('serverFreeForCompany')
  t.plan(1)
  t.deepEqual(serverFreeForCompany(), { type: actions.FETCHING_COMPANY_END })
})

test('updateCompanyList', function (t) {
  const updateCompanyList = actions.__get__('updateCompanyList')
  t.plan(1)
  t.deepEqual(updateCompanyList(1), { type: actions.UPDATE_COMPANY_LIST, companyList: 1 })
})

test('updateCompany', function (t) {
  const updateCompanyList = actions.__get__('updateCompany')
  t.plan(1)
  t.deepEqual(updateCompanyList(1), { type: actions.UPDATE_COMPANY, companyObj: 1 })
})

test('setAltMsg', function (t) {
  const setAltMsg = actions.__get__('setAltMsg')
  t.plan(1)
  t.deepEqual(setAltMsg(1), { type: actions.SET_ALT_MESSAGE, message: 1 })
})

test('setAlert', function (t) {
  const setAlert = actions.__get__('setAlert')
  t.plan(1)
  t.deepEqual(setAlert(1), { type: actions.SET_ERROR_ALERT, error: 1 })
})

test('clearAltMsg', function (t) {
  const clearAltMsg = actions.__get__('clearAltMsg')
  t.plan(1)
  t.deepEqual(clearAltMsg(), { type: actions.CLEAR_ALT_MESSAGE })
})

test('clearAlert', function (t) {
  const clearAlert = actions.__get__('clearAlert')
  t.plan(1)
  t.deepEqual(clearAlert(), { type: actions.CLEAR_ERROR_ALERT })
})
