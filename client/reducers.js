import { combineReducers } from 'redux'
import {
  UPDATE_COMPANY_LIST,
  UPDATE_COMPANY,
  FETCHING_COMPANY_LIST_START,
  FETCHING_COMPANY_LIST_END,
  FETCHING_COMPANY_START,
  FETCHING_COMPANY_END,
  SET_ERROR_ALERT,
  CLEAR_ERROR_ALERT
} from './actions'

function companyList (state = [], action) {
  switch (action.type) {
    case UPDATE_COMPANY_LIST:
      return action.companyList
    default:
      return state
  }
}

function currentCompany (state = null, action) {
  switch (action.type) {
    case UPDATE_COMPANY:
      return action.companyObj
    default:
      return state
  }
}

function isMainFetching (state = 0, action) {
  switch (action.type) {
    case FETCHING_COMPANY_LIST_START:
      return state + 1
    case FETCHING_COMPANY_LIST_END:
      return state - 1
    default:
      return state
  }
}

function isCompanyFetching (state = 0, action) {
  switch (action.type) {
    case FETCHING_COMPANY_START:
      return state + 1
    case FETCHING_COMPANY_END:
      return state - 1
    default:
      return state
  }
}

function errorAlert (state = null, action) {
  switch (action.type) {
    case SET_ERROR_ALERT:
      return action.error
    case CLEAR_ERROR_ALERT:
      return null
    default:
      return state
  }
}

const store = combineReducers({
  companyList,
  currentCompany,
  isMainFetching,
  isCompanyFetching,
  errorAlert
})

export default store
