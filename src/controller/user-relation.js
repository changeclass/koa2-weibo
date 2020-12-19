/**
 * @description: 用户关系的controller
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 15:49:12
 * @LastEditTime: 2020-12-19 15:49:12
 * @LastEditors: 小康
 */

const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollower } = require('../services/user-relation')

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

module.exports = {
  getFans
}
