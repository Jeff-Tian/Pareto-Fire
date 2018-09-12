import qs from 'querystring'

exports.handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  return {
    statusCode: 200,
    body: event.body,
  }
}