import React from 'react'
import { shallow } from 'enzyme'
import test from 'tape'
import CompanySelector from '../../../client/components/company-selector.jsx'

test('A CompanySelector renders a SelectField', function (t) {
  t.plan(1)
  const companies = [
    {
      companyTicker: 'test-ticker-2',
      companyPrintName: 'test-name-1'
    },
    {
      companyTicker: 'test-ticker-2',
      companyPrintName: 'test-name-2'
    }
  ]
  const company = companies[1]
  const wrapper = shallow(
    <CompanySelector
      currentCompany={company}
      companies={companies}
    />
  )
  t.equal(wrapper.find('SelectField').length, 1)
})
