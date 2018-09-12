import React from 'react'
import { CitiClientId, CitiClientRedirect, CitiClientSecret } from '../common/constants'
import 'regenerator-runtime/runtime'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class CitiOAuth extends React.Component {
  constructor(props) {
    super(props)

    this.state = { code: '' }
  }

  async componentDidMount() {
    const code = new window.URLSearchParams(window.location.search).get('code')

    const res = await window.fetch(`/.netlify/functions/citi-oauth-token?code=${code}`)
    
    console.log('res = ', res, await res.json())
  }

  render() {
    return <div></div>
  }
}