/**
 * @description: 微博 @ 用户关系
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-20 11:39:05
 * @LastEditTime: 2020-12-20 11:39:06
 * @LastEditors: 小康
 */

const { AtRelation } = require('../db/model')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} blogId
 * @param {*} userId
 * @description: 创建微博艾特用户的关系
 */
async function createAtReplation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}

module.exports = { createAtReplation }
