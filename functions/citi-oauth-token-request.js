import qs from 'querystring'
import { CitiClientId, CitiClientRedirect, CitiClientSecret } from '../src/common/constants'


exports.handler = (event, context, callback) => {
  let body = {
    grant_type: 'authorization_code',
    code: event.queryStringParameters.code,
    redirect_uri: CitiClientRedirect,
  }

  let postData = qs.stringify(body)
  console.log('postData = ', postData)

  let authorization = `Basic ${Buffer.from(`${CitiClientId}:${CitiClientSecret}`).toString('base64')}`
  authorization = 'Basic NjFlOGJhYjAtYTY1MC00ZGQ2LTgxOGQtMjQ1ZTIyMDc5OGI3OmxUNW9JMmtZNGhOOGdUMWZQMGhEM3FUMnlLMnFSN3VBMWpXMHNTMXBBMGtCNHhONG5C'

  let headers = ({
    'User-Agent': 'curl/7.47.0',
    'accept': 'application/json',
    authorization: authorization,
    'content-type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
  })

  // const options = ({
  //   hostname: 'sandbox.apihub.citi.com',
  //   port: 443,
  //   path: '/gcb/api/clientCredentials/oauth2/token/au/gcb',
  //   method: 'POST',
  //   headers: headers,
  // })

  var request = require('request')

  var options = {
    method: 'POST',
    url: 'https://sandbox.apihub.citi.com/gcb/api/clientCredentials/oauth2/token/au/gcb',
    headers:
      {
        accept: 'application/json',
        authorization: 'Basic NjFlOGJhYjAtYTY1MC00ZGQ2LTgxOGQtMjQ1ZTIyMDc5OGI3OmxUNW9JMmtZNGhOOGdUMWZQMGhEM3FUMnlLMnFSN3VBMWpXMHNTMXBBMGtCNHhONG5C',
        'content-type': 'application/x-www-form-urlencoded',
      },
    form:
      {
        grant_type: 'authorization_code',
        code: body.code,
        redirect_uri: 'https://fire.pa-pa.me/citi-oauth',
      },
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)

    console.log(body)
  })

}