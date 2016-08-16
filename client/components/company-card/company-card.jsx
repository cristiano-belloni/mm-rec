import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Story from '../story/story'
import styles from './company-card.local.css'

function renderStories (stories) {
  if (!stories || !stories.length) {
    return <div className={styles.error}>No stories found</div>
  } else {
    return stories.slice(0, 2).map(story => (
      <Story
        key={story.id}
        id={story.id}
        body={story.body}
        sentiment={story.sentiment}
      />
    ))
  }
}

function renderCompany (props) {
  const stories = renderStories(props.stories)
  return (
    <div className={styles['card-contents']}>
      <CardTitle
        title={props.companyName}
        subtitle={props.companyTicker}
      />
      <CardText
        children={
          <div>
            {stories}
          </div>
        }
      />
    </div>
  )
}

const CompanyCard = (props) => (
  <Card>
    {renderCompany(props)}
  </Card>
)

CompanyCard.propTypes = {
  companyName: React.PropTypes.string,
  companyTicker: React.PropTypes.string,
  stories: React.PropTypes.array,
  altMessage: React.PropTypes.string
}

CompanyCard.defaultProps = {
  companyName: '－',
  companyTicker: '－'
}

export default CompanyCard
