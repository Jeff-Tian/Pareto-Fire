import qs from 'querystring'

exports.handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { identity, user } = context.clientContext ? context.clientContext : { identity: null, user: null }
  const { uri } = event.queryStringParameters
  const body = qs.parse(event.body)

  return {
    statusCode: 200,
    body: JSON.stringify({ identity, user, uri, body, event: event }),
  }
}