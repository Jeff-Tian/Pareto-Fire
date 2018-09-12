import qs from 'querystring'
import fetch from 'node-fetch'
import { CitiClientId, CitiClientRedirect, CitiClientSecret } from '../src/common/constants'

const API_ENDPOINT = 'https://sandbox.apihub.citi.com/gcb/api/clientCredentials/oauth2/token/us/gcb'

exports.handler = async (event, context, callback) => {
  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: Buffer.from(`Basic ${CitiClientId}:${CitiClientSecret}`).toString('base64'),
      contentType: 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      grant_type: 'authorization_code',
      code: event.queryStringParameters.code,
      redirect_uri: encodeURIComponent(CitiClientRedirect),
    }),
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}