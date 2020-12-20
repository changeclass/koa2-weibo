/**
 * @description: 微博 @ 用户关系
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-20 11:39:05
 * @LastEditTime: 2020-12-20 11:39:06
 * @LastEditors: 小康
 */

const { AtRelation, Blog, User } = require('../db/model')
const { PAGE_SIZE } = require('../config/constant')
const { formatBlog, formatUser } = require('./_format')
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

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} userId
 * @description: 获取at用户的微博数量（未读）
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} userId
 * @param {*} pageIndex
 * @param {*} pageSize
 * @description: 获取 @ 用户的微博列表
 */
async function getUserBlogList({ userId, pageIndex, pageSize = PAGE_SIZE }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      // @ 关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      // 用户
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })
  let blogList = result.rows.map((row) => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {Object} 要更新的内容
 * @param {Object} 条件
 * @description: 更新数据
 */
async function updataAtRelation({ newIsRead }, { userId, isRead }) {
  // 拼接更新内容
  const updataData = {}
  if (newIsRead) {
    updataData.isRead = newIsRead
  }
  // 拼接查询条件
  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }
  // 执行更新
  const result = await AtRelation.update(updataData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  createAtReplation,
  getAtRelationCount,
  getUserBlogList,
  updataAtRelation
}
