import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const companies = ['Microsoft', 'Facebook', 'Google']
const items = companies.map(
  companyName => <MenuItem
    value={companyName}
    key={companyName}
    primaryText={companyName}
  />)

function handleSelect (company, index) {
  if (index < 0) return
  console.log(company)
}

const CompanySelector = () => (
  <SelectField
    labelStyle={{color: '#fff'}}
    value={companies[0]}
    onChange={handleSelect}
    maxHeight={200}
  >
    {items}
  </SelectField>
)

export default CompanySelector
