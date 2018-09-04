import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const ParetoHeader = ({ siteTitle, subtitle }) => (
  <Header as='h2' attached="top" color="red">
    <Icon name='gripfire' color="red"/>
    <Header.Content>
      {siteTitle}
      <Header.Subheader>{subtitle}</Header.Subheader>
    </Header.Content>
  </Header>
)

export default ParetoHeader
