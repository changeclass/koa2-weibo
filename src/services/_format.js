/**
 * @description: 数据格式化
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 14:32:10
 * @LastEditTime: 2020-12-17 14:32:10
 * @LastEditors: 小康
 */
const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../config/constant')
const { timeFormat } = require('../utils/dt')
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

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )

  return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime).map(_formatContent)
  }
  // 对象
  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result)
  return result
}

module.exports = { formatUser, formatBlog }
