/**
 * @description: 首页 controller
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:46:39
 * @LastEditTime: 2020-12-18 16:46:39
 * @LastEditors: 小康
 */
const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')

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

module.exports = { create }
