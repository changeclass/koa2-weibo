/**
 * @description 链接 redis 的方法 get set
 * @author 小康
 * @website https://xiaokang.me
 */
const redis = require('redis')

const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.prot, REDIS_CONF.host)
redisClient.on('error', (err) => {
  console.log('redis error', err)
})

/**
 *
 * @param {string} key 键
 * @param {string} value 值
 * @param {number} timeout 超时时间
 */
function set(key, value, timeout = 60 * 60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, timeout)
}
/**
 *
 * @param {string} key 键
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = { set, get }
