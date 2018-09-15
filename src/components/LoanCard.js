import Link from 'gatsby-link'
import { Card } from 'semantic-ui-react'
import moment from 'moment'
import ImagePreview from './ImagePreview'
import React from 'react'
import { LoanSchemes } from '../common/constants'

export default ({ loan }) => loan ? <Card as={Link} fluid color='red'
                                          to={loan.confirmed ? `/loan?loan_id=${loan.id}&confirmed` : `/loan?loan_id=${loan.id}`}>
  <Card.Content>
    <Card.Header>{`￥ ${loan.data.howMuch} 元`}</Card.Header>
    <Card.Meta>{moment(loan.created_at).fromNow()}</Card.Meta>
    <Card.Description>{LoanSchemes[loan.data.scheme].name}</Card.Description>
  </Card.Content>
  <Card.Content>
    <ImagePreview images={loan.files}/>
  </Card.Content>
</Card> : null