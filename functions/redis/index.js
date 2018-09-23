const redis = require('redis'),
  client = redis.createClient({
    host: 'redis-17221.c16.us-east-1-3.ec2.cloud.redislabs.com',
    port: 17221,
    no_ready_check: true,
    auth_pass: 'j2P9tFpBgCa2FvKsR8Uc9WemnXn1E5TE',
  })

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
client.on('connect', function() {
  console.log('redis connected')
})

client.on('error', function(err) {
  console.log('Error ' + err)
})

// client.set('string key', 'string val', redis.print)
// client.hset('hash key', 'hashtest 1', 'some value', redis.print)
// client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)
// client.hkeys('hash key', function(err, replies) {
//   console.log(replies.length + ' replies:')
//   replies.forEach(function(reply, i) {
//     console.log('    ' + i + ': ' + reply)
//   })
//   client.quit()
// })

function handleResult(resolve, reject) {
  return (error, reply) => {
    if (!error) {
      resolve(reply)
    } else {
      reject(error)
    }
  }
}

async function setSync(key, value, duration) {
  return new Promise((resolve, reject) => {
    client.set(key, value, 'EX', duration, handleResult(resolve, reject))
  })
}

module.exports = {
  set: async (key, value, duration) => {
    const setTime = new Date()
    if (client.connected) {
      return await setSync(key, value, duration)
    } else {
      return new Promise((resolve, reject) => {
        client.once('connect', async () => {
          const now = new Date()
          const diffInSeconds = Math.ceil((now - setTime) / 1000)
          client.set(key, value, 'EX', duration - diffInSeconds, handleResult(resolve, reject))
        })
        client.once('error', reject)
      })
    }
  },
  get: async (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, handleResult(resolve, reject))
    })
  },
}