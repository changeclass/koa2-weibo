/**
 * @description: 用户关系的controller
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 15:49:12
 * @LastEditTime: 2020-12-19 15:49:12
 * @LastEditors: 小康
 */

const { addFollowerFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUsersByFollower, addFollow } = require('../services/user-relation')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {number} userId 用户id
 * @description: 根据用户id获取粉丝列表
 */
async function getFans(userId) {
  // service
  const { count, userList } = await getUsersByFollower(userId)
  return new SuccessModel({ count, userList })
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} myUserId 我的ID
 * @param {*} curUserId 当前登录的用户ID
 * @description: 关注
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollow(myUserId, curUserId)
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

module.exports = {
  getFans,
  follow
}
