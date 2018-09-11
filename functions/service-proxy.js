exports.handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  const { identity, user } = context.clientContext
  const { uri } = event.queryStringParameters
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  })
}