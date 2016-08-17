import React from 'react'
import { shallow } from 'enzyme'
import test from 'tape'
require('../../../helpers/test-helper')
const CompanyCard = require('../../../client/components/company-card/company-card').default

test('A story renders the appropriate components', function (t) {
  t.plan(3)
  const wrapper = shallow(
    <CompanyCard
      companyName='name'
      companyTicker='ticker'
      stories={[
        {
          id: 'id1',
          body: 'body1',
          sentiment: 'sentiment1'
        },
        {
          id: 'id2',
          body: 'body2',
          sentiment: 'sentiment2'
        }
      ]}
    />
  )
  t.equal(wrapper.find('CardTitle').length, 1)
  t.equal(wrapper.find('CardText').length, 1)
  t.equal(wrapper.find('Story').length, 2)
})
