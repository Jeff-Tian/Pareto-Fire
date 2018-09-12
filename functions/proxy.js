exports.handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  } else {
    return { statusCode: 200, body: 'posted' }
  }
}