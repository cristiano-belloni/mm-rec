import React from 'react'
import { shallow } from 'enzyme'
import test from 'tape'
require('../../../helpers/test-helper')
const Story = require('../../../client/components/story/story.jsx').default

test('A story renders three divs and a FontIcon', function (t) {
  t.plan(2)
  const wrapper = shallow(
    <Story
      id={14}
      body='test'
      sentiment='negative'
    />
  )
  console.log(wrapper)
  t.equal(wrapper.find('div').length, 3)
  t.equal(wrapper.find('FontIcon').length, 1)
})
