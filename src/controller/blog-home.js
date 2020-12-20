/**
 * @description: 首页 controller
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:46:39
 * @LastEditTime: 2020-12-18 16:46:39
 * @LastEditors: 小康
 */
const xss = require('xss')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../config/constant')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createAtReplation } = require('../services/at-relation')
const { createBlog, getFollowerBlogList } = require('../services/blog')
const { getUserInfo } = require('../services/user')
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {string} userId
 * @param {string} content
 * @param {string} image
 * @description: 创建微博
 */
async function create({ userId, content, image }) {
  // 分析并手机 content 中的@用户
  // content格式
  const atUserNameList = []
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    // 目的是获取用户名
    atUserNameList.push(userName)
    return matchStr //替换不生效
  })
  // 根据 @ 用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map((userName) => getUserInfo(userName))
  )
  // 根据用户信息 获取id
  const atUserIdList = atUserList.map((user) => user.id)
  // servers
  try {
    const blog = await createBlog({ userId, content: xss(content), image })
    // 创建at关系
    await Promise.all(
      atUserIdList.map((userId) => {
        createAtReplation(blog.id, userId)
      })
    )
    // 返回
    return new SuccessModel(blog)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {number} userId
 * @param {number} pageIndex
 * @description: 获取首页微博列表
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowerBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const { count, blogList } = result

  // 返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = { create, getHomeBlogList }
