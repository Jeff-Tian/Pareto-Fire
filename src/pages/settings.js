import React from 'react'
import { Container } from 'semantic-ui-react'
import { push } from 'gatsby-link'

const netlifyIdentity = require('netlify-identity-widget')

export default class Settings extends React.Component {
  componentWillMount() {
    netlifyIdentity.init({
      container: 'body', // defaults to document.body,
    })

    netlifyIdentity.open()
    netlifyIdentity.on('close', () => push('/'))
    netlifyIdentity.on('logout', netlifyIdentity.open)
  }

  render() {
    return <Container></Container>
  }
}