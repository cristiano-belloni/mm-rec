import React from 'react'
import { connect } from 'react-redux'
import CompanyCard from '../components/company-card'
import CompanySelector from '../components/company-selector'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import {fetchCompanyList, fetchCompany} from '../actions'
import style from './main.local.scss'

class Main extends React.Component {

  constructor (props) {
    super(props)
    this.handleCompanyChange = this.handleCompanyChange.bind(this)
  }

  handleCompanyChange (e, idx, ticker) {
    this.props.dispatch(fetchCompany(ticker))
  }

  componentWillMount () {
    this.props.dispatch(fetchCompanyList())
  }

  render () {
    return (
      <div className={style.main}>
        <Toolbar>
          <ToolbarGroup>
            <CompanySelector
              companies={this.props.companyList}
              currentCompany={this.props.currentCompany}
              onChange={this.handleCompanyChange}
            />
          </ToolbarGroup>
        </Toolbar>
        <CompanyCard />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}
// fetchCompanyList componentWillMount
export default connect(mapStateToProps)(Main)
