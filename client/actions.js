export const UPDATE_COMPANY_LIST = 'UPDATE_COMPANY_LIST'
export const UPDATE_COMPANY = 'UPDATE_COMPANY'
export const FETCHING_COMPANY_LIST_START = 'FETCHING_COMPANY_LIST_START'
export const FETCHING_COMPANY_LIST_END = 'FETCHING_COMPANY_LIST_END'
export const FETCHING_COMPANY_START = 'FETCHING_COMPANY_START'
export const FETCHING_COMPANY_END = 'FETCHING_COMPANY_END'
export const SET_ERROR_ALERT = 'SET_ERROR_ALERT'
export const CLEAR_ERROR_ALERT = 'CLEAR_ERROR_ALERT'

function serverBusyForList () {
  return { type: FETCHING_COMPANY_LIST_START }
}

function serverFreeForList () {
  return { type: FETCHING_COMPANY_LIST_END }
}

function serverBusyForCompany () {
  return { type: FETCHING_COMPANY_START }
}

function serverFreeForCompany () {
  return { type: FETCHING_COMPANY_END }
}

function updateCompanyList (companyList) {
  return { type: UPDATE_COMPANY_LIST, companyList }
}

function updateCompany (companyObj) {
  return { type: UPDATE_COMPANY, companyObj }
}

function setAlert (error) {
  return { type: SET_ERROR_ALERT, error }
}

function clearAlert () {
  return { type: CLEAR_ERROR_ALERT }
}

export function fetchCompanyList () {
  return (dispatch) => {
    dispatch(serverBusyForList())
    dispatch(clearAlert())
    window.fetch('/companies')
      .then(response => response.json())
      .then(data => {
        dispatch(serverFreeForList())
        dispatch(updateCompanyList(data))
      })
      .catch(error => {
        dispatch(serverFreeForList())
        const errStr = `There has been a problem downloading companies: ${error}`
        dispatch(setAlert(errStr))
      })
  }
}

export function fetchCompany (companyTicker) {
  return (dispatch, getState) => {
    dispatch(serverBusyForCompany())
    dispatch(clearAlert())
    window.fetch(`/companies/${companyTicker}`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data
        updatedData.name = getState().companyList.filter(company => company.tickerCode === companyTicker)[0].name
        updatedData.tickerCode = companyTicker
        dispatch(serverFreeForCompany())
        dispatch(updateCompany(updatedData))
      })
      .catch(error => {
        dispatch(serverFreeForCompany())
        const errStr = `There has been a problem downloading company ${companyTicker}: ${error}`
        dispatch(setAlert(errStr))
      })
  }
}
