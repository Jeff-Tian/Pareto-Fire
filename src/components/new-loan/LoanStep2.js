import * as React from 'react'
import { Card } from 'semantic-ui-react'
import { LoanSchemes } from '../../common/constants'

export default ({ scheme, selectScheme }) => <Card.Group style={{ marginBottom: '10px' }}>
  {
    Object.keys(LoanSchemes).map(l =>
      <Card fluid color={scheme === l ? 'red' : 'grey'} header={LoanSchemes[l].name}
            meta={Number(LoanSchemes[l].annual_interest) * 100 + ' %'}
            description={LoanSchemes[l].description}
            onClick={(event) => selectScheme(event, l)}/>)
  }
</Card.Group>