/**
 * @description: 微博 @ 关系
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-20 14:10:21
 * @LastEditTime: 2020-12-20 14:10:23
 * @LastEditors: 小康
 */

const { getAtRelationCount } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} userId
 * @description: 获取 @ 我的微博数量
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

module.exports = {
  getAtMeCount
}
