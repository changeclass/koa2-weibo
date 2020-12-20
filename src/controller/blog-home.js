/**
 * @description: 首页 controller
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:46:39
 * @LastEditTime: 2020-12-18 16:46:39
 * @LastEditors: 小康
 */
const xss = require('xss')
const { PAGE_SIZE } = require('../config/constant')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowerBlogList } = require('../services/blog')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {string} userId
 * @param {string} content
 * @param {string} image
 * @description: 创建微博
 */
async function create({ userId, content, image }) {
  // servers
  try {
    const blog = await createBlog({ userId, content: xss(content), image })
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
