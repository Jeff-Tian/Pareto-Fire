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
    const res = await window.fetch('https://sandbox.apihub.citi.com/gcb/api/clientCredentials/oauth2/token/us/gcb', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: btoa(`${CitiClientId}:${CitiClientSecret}`),
        contentType: 'application/x-www-form-urlencoded',
      },
      body: encode({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: CitiClientRedirect,
      }),
    })

    console.log('res = ', res, await res.json())
  }

  render() {
    return <div></div>
  }
}