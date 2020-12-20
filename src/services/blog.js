/**
 * @description: 微博servers
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:48:09
 * @LastEditTime: 2020-12-18 16:48:09
 * @LastEditors: 小康
 */
const { PAGE_SIZE } = require('../config/constant')
const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @description: 创建微博
 * @param {string} userId
 * @param {string} content
 * @param {string} image
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} userName 用户名
 * @param {*} pageIndex 页面索引
 * @param {*} pageSize 页面大小
 * @description: 根据用户名查询微博
 */
async function getBlogListByUser({
  userName,
  pageIndex = 0,
  pageSize = PAGE_SIZE
}) {
  // 拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })
  // 获取dataValues
  let blogList = result.rows.map((row) => row.dataValues)

  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}

/**
 * @author 小康
 * @date 2020-12-20
 * @param {any} userId
 * @param {any} pageIndex 默认为0
 * @param {any} pageSize 常量 PAGE_SIZE 的值
 * @description 获取关注者的微博
 */
async function getFollowerBlogList({
  userId,
  pageIndex = 0,
  pageSize = PAGE_SIZE
}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  })
  // 格式化数据
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
module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowerBlogList
}
