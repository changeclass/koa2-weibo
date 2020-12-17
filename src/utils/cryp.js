/**
 * @description: 加密方法
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 15:43:56
 * @LastEditTime: 2020-12-17 15:43:56
 * @LastEditors: 小康
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {String} content 要加密的明文
 * @description: MD5加密
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} content 明文
 * @description: 加密方法
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = {
  doCrypto
}
