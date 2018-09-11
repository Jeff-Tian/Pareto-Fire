exports.handler = function(event, context, callback) {
  const { identity, user } = context.clientContext
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  })
}