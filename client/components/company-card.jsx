import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'

const CompanyCard = () => (
  <Card>
    <CardTitle
      title='Microsoft'
      subtitle='MSFT'
    />
    <CardText
      children={
        <div>
          <p>Story 1</p>
          <p>Story 2</p>
        </div>
      }
    />
  </Card>
)

export default CompanyCard
