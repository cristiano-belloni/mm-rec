import React from 'react'
import { shallow } from 'enzyme'
import test from 'tape'
import { red500, green500, grey700 } from 'material-ui/styles/colors'
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
  t.equal(wrapper.find('div').length, 3)
  t.equal(wrapper.find('FontIcon').length, 1)
})

test('A [red] negative story renders a negative sentiment FontIcon', function (t) {
  t.plan(3)
  const wrapper = shallow(
    <Story
      id={88}
      body='test'
      sentiment='negative'
    />
  )
  const fontIcon = wrapper.find('FontIcon')

  t.equal(fontIcon.node.props.className, 'material-icons')
  t.equal(fontIcon.node.props.children, 'sentiment_dissatisfied')
  t.equal(fontIcon.node.props.color, red500)
})

test('A [green] positive story renders a positive sentiment FontIcon', function (t) {
  t.plan(3)
  const wrapper = shallow(
    <Story
      id={88}
      body='test'
      sentiment='positive'
    />
  )
  const fontIcon = wrapper.find('FontIcon')

  t.equal(fontIcon.node.props.className, 'material-icons')
  t.equal(fontIcon.node.props.children, 'sentiment_satisfied')
  t.equal(fontIcon.node.props.color, green500)
})

test('A [grey] neutral story renders a neutral sentiment FontIcon', function (t) {
  t.plan(3)
  const wrapper = shallow(
    <Story
      id={88}
      body='test'
      sentiment='neutral'
    />
  )
  const fontIcon = wrapper.find('FontIcon')

  t.equal(fontIcon.node.props.className, 'material-icons')
  t.equal(fontIcon.node.props.children, 'sentiment_neutral')
  t.equal(fontIcon.node.props.color, grey700)
})

test('An unknown sentiment story renders a very dissatisfied sentiment FontIcon', function (t) {
  t.plan(3)
  const wrapper = shallow(
    <Story
      id={88}
      body='test'
      sentiment='no_way'
    />
  )
  const fontIcon = wrapper.find('FontIcon')

  t.equal(fontIcon.node.props.className, 'material-icons')
  t.equal(fontIcon.node.props.children, 'sentiment_very_dissatisfied')
  t.equal(fontIcon.node.props.color, red500)
})

test('Renders the body div with right content', function (t) {
  t.plan(1)
  const bodyContent = 'this is the body'
  const wrapper = shallow(
    <Story
      id={88}
      body={bodyContent}
      sentiment='positive'
    />
  )
  const divs = wrapper.find('div')

  t.equal(divs.nodes.some(node => node.props.children === bodyContent), true)
})
