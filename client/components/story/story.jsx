import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import style from './story.local.css'
import { red500, green500, grey700 } from 'material-ui/styles/colors'

function renderSentimentIcon (sentiment) {
  let iconName, color
  switch (sentiment) {
    case 'negative':
      iconName = 'sentiment_dissatisfied'
      color = red500
      break
    case 'positive':
      iconName = 'sentiment_satisfied'
      color = green500
      break
    case 'neutral':
      iconName = 'sentiment_neutral'
      color = grey700
      break
    default:
      iconName = 'sentiment_very_dissatisfied'
      color = red500
  }
  return (
    <FontIcon
      color={color}
      className="material-icons">
      {iconName}
    </FontIcon>
  )
}

function Story (props) {
  return (
    <div
      className={style['story-container']}
      key={props.id}>
      <div
        className={style['story-body']}
      >
        {props.body}
      </div>
      <div
        className={style['story-sentiment']}
      >
        {renderSentimentIcon(props.sentiment)}
      </div>
    </div>
  )
}

Story.propTypes = {
  id: React.PropTypes.number,
  body: React.PropTypes.string,
  sentiment: React.PropTypes.string
}

export default Story
