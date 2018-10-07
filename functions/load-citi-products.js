import qs from 'querystring'

import fetch, { Headers } from 'node-fetch'
import { CitiClientId, CitiClientSecret } from '../src/common/constants'
import uuid from 'uuid/v4'

const Redis = require('../functions/redis')

const API_ENDPOINT = 'https://sandbox.apihub.citi.com/gcb/api/v1/apac/onboarding/products'

exports.handler = async (event, context, callback) => {
  let userId = event.queryStringParameters.userId
  console.log(`getting access token for ${userId}...`)
  let accessToken = await Redis.get(`oauth-${userId}`)
  if (accessToken) {
    accessToken = JSON.parse(accessToken).access_token
    console.log(`access token of ${userId} is ${accessToken}`)
  } else {
    console.log(`getting refresh token for ${userId}`)
    const refreshToken = await Redis.get(`refresh-${userId}`)
    console.log(`refresh token of ${userId} is ${refreshToken}`)

    if (refreshToken) {
      const ENDPOINT = 'https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/refresh'

      const result = await fetch(ENDPOINT, {
        method: 'POST',
        headers: new Headers({
          accept: 'application/json',
          authorization: `Basic ${Buffer.from(`${CitiClientId}:${CitiClientSecret}`).toString('base64')}`,
          'content-type': 'application/x-www-form-urlencoded',
        }),
        body: qs.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      }).then(r => r.json())

      accessToken = result.access_token
      console.log('refreshed access token result = ', result)

      await Redis.set(`oauth-${userId}`, JSON.stringify(result), result.expires_in)
      await Redis.set(`refresh-${userId}`, result.refresh_token, result.expires_in)
    }
  }

  console.log('getting products with accessToekn = ', accessToken)
  let headers = new Headers({
    'accept': 'application/json',
    authorization: `Beare ${accessToken}`,
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