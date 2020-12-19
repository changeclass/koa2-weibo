/**
 * @description: 微博广场
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 14:38:57
 * @LastEditTime: 2020-12-19 14:38:58
 * @LastEditors: 小康
 */

const { getSquareCacheList } = require('../cache/blog')
const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} pageIndex 页面索引
 * @description: 获得广场的微博列表
 */
async function getSquareBlogList(pageIndex = 0) {
  // cache
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = { getSquareBlogList }
