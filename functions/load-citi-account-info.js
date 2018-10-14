import fetch, { Headers } from 'node-fetch'
import { CitiClientId } from '../src/common/constants'
import uuid from 'uuid/v4'
import AccessToken from './access-token'

const API_ENDPOINT = 'https://sandbox.apihub.citi.com/gcb/api/v1/accounts'


exports.handler = async (event, context, callback) => {
  let accessToken = await AccessToken.getByUserId(event.queryStringParameters.userId)

  console.log('getting account info with accessToekn = ', accessToken)
  let headers = new Headers({
    'accept': 'application/json',
    authorization: `Bearer ${accessToken}`,
    client_id: CitiClientId,
    nextstartindex: null,
    uuid: uuid(),
  })

  return fetch(API_ENDPOINT, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.json())
    .then(async (data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
}