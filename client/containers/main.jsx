import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import CompanyCard from '../components/company-card/company-card'
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
    const companyName = get(this.props, 'currentCompany.name')
    const companyTicker = get(this.props, 'currentCompany.tickerCode')
    const companyPrice = get(this.props, 'currentCompany.latestPrice')
    const priceUnits = get(this.props, 'currentCompany.priceUnits')
    const ticker = priceUnits ? `${companyTicker} (${companyPrice} ${priceUnits.split(':')[1]})` : companyTicker
    const stories = get(this.props, 'currentCompany.stories')
    const altMessage = get(this.props, 'altMessage')

    return (
      <div className={style.main}>
        <Toolbar>
          <ToolbarGroup>
            <CompanySelector
              companies={this.props.companyList}
              currentCompany={companyTicker}
              onChange={this.handleCompanyChange}
            />
          </ToolbarGroup>
        </Toolbar>
        <CompanyCard
          companyName={companyName}
          companyTicker={ticker}
          stories={stories}
          altMessage={''}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}
// fetchCompanyList componentWillMount
export default connect(mapStateToProps)(Main)
