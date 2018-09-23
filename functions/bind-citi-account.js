import qs from 'querystring'
import fetch, { Headers } from 'node-fetch'
import { CitiClientId, CitiClientRedirect, CitiClientSecret } from '../src/common/constants'
import uuid from 'uuid/v4'

const API_ENDPOINT = 'https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/token/au/gcb'

exports.handler = async (event, context, callback) => {
  let headers = new Headers({
    'Accept': 'application/json',
    Authorization: `Basic ${Buffer.from(`${CitiClientId}:${CitiClientSecret}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  })

  let body = {
    grant_type: 'authorization_code',
    code: event.queryStringParameters.code,
    redirect_uri: CitiClientRedirect,
  }
  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: headers,
    body: qs.stringify(body),
  })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        let userId = event.queryStringParameters.state
        // saveAccessTokenToRedis(`oauth-${userId}`, data)

        return fetch('https://sandbox.apihub.citi.com/gcb/api/v1/customers/profiles', {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/json',
            Authorization: `Bearer ${data.access_token}`,
            'Content-Type': 'application/json',
            'uuid': uuid(),
            client_id: CitiClientId,
          }),
        }).then(response => response.json())
          .then(data => {
            return {
              statusCode: 200,
              body: JSON.stringify(data),
            }
          })
      } else {
        return {
          statusCode: 423,
          body: JSON.stringify({
            params: { headers, body },
            upstream: data,
            body: qs.stringify(body),
          }),
        }
      }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
}