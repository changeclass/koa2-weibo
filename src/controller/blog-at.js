/**
 * @description: 微博 @ 关系
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-20 14:10:21
 * @LastEditTime: 2020-12-20 14:10:23
 * @LastEditors: 小康
 */

const {
  getAtRelationCount,
  getUserBlogList
} = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../config/constant')
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

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} userId
 * @param {*} pageIndex
 * @description: 获取@ 用户的微博列表
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  // service
  const result = await getUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const { count, blogList } = result

  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList
}
