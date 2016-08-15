import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

function renderMenuItem(itemObj, idx) {
  return (
    <MenuItem
      key={idx}
      value={itemObj.tickerCode}
      primaryText={itemObj.name}
    />
  )
}

const CompanySelector = (props) => (
  <SelectField
    labelStyle={{color: '#fff'}}
    hintStyle={{color: '#fff'}}
    value={props.selectedCompany}
    onChange={props.onChange}
    maxHeight={props.maxHeight}
    hintText={'Select company'}
    onChange={props.onChange}
  >
    {props.companies.map(renderMenuItem)}
  </SelectField>
)

CompanySelector.propTypes = {
  onChange: React.PropTypes.func,
  selectedCompany: React.PropTypes.string,
  companies: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      companyTicker: React.PropTypes.string.isRequired,
      companyPrintName: React.PropTypes.string.isRequired
    })
  ),
  maxHeight: React.PropTypes.number.isRequired
}

CompanySelector.defaultProps = {
  maxHeight: 200
}

export default CompanySelector
