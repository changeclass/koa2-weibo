/**
 * @description: user 的控制器
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 14:19:03
 * @LastEditTime: 2020-12-17 14:19:05
 * @LastEditors: 小康
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {String} userName 需要检查的用户名
 * @description: 检查用户名是否存在
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已经存在
    return new SuccessModel(userInfo)
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}
