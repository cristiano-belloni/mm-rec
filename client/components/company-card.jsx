import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'

function renderStory (story, idx) {
  return <p key={idx}>{story.body}</p>
}

const CompanyCard = (props) => (
  <Card>
    <CardTitle
      title={props.companyName}
      subtitle={props.companyTicker}
    />
    <CardText
      children={
        <div>
        {props.stories ? props.stories.map(renderStory) : null}
        </div>
      }
    />
  </Card>
)

/*CompanyCard.propTypes = {
  companyName: React.PropTypes.string.isRequired,
  companyTicker: React.PropTypes.string.isRequired,
  stories: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}*/

export default CompanyCard
