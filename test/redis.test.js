const Redis = require('../functions/redis')

const assert = require('power-assert')

describe('redis', () => {
  it('sets value', async () => {
    const setResult = await Redis.set('test', 'value', 100)
    assert(setResult === 'OK')
    assert((await Redis.get('test')) === 'value')
  })
})