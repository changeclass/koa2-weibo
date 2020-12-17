/**
 * @description: 数据格式化
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 14:32:10
 * @LastEditTime: 2020-12-17 14:32:10
 * @LastEditors: 小康
 */
const { DEFAULT_PICTURE } = require('../config/constant')

/**
 * 格式化头像
 * @author 小康
 * @date 2020-12-17
 * @param {Object} obj 用户对象
 * @returns {Object} 处理后的结果
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户
 * @author 小康
 * @date 2020-12-17
 * @param {Array|Object} list 用户列表或单个用户对象
 * @returns {any}
 */
function formatUser(list) {
  if (list == null) {
    return list
  }
  if (list instanceof Array) {
    // 数组 用户列表
    return list.map(_formatUserPicture)
  }
  // 单个对象
  let result = list
  result = _formatUserPicture(result)
  return result
}

module.exports = { formatUser }
