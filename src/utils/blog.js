/**
 * @description: 微博数据相关的工具方法
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 11:30:22
 * @LastEditTime: 2020-12-19 11:30:22
 * @LastEditors: 小康
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 文件内容
const BLOG_LIST_TPL = fs
  .readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))
  .toString()

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {Array} blogList 微博列表
 * @param {Boolean} canReply 是否可以回复
 * @description: 根据blogList渲染出HTML字符串
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = { getBlogListStr }
