/**
 * @description: 微博数据格式校验
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 17:15:27
 * @LastEditTime: 2020-12-18 17:15:28
 * @LastEditors: 小康
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验微博数据格式
 * @param {Object} data 微博数据
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate
