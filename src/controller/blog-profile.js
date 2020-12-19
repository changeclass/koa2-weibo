/**
 * @description: 个人主页
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 09:47:36
 * @LastEditTime: 2020-12-19 09:47:36
 * @LastEditors: 小康
 */

const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面索引 默认0
 * @description: 创建微博
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({ userName, pageIndex, PAGE_SIZE })
  const blogList = result.blogList
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = { getProfileBlogList }
