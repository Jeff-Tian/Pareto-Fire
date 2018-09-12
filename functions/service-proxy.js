import querystring from 'querystring'

exports.handler = async (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'hello',
  })
}