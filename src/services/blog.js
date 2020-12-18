/**
 * @description: 微博servers
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:48:09
 * @LastEditTime: 2020-12-18 16:48:09
 * @LastEditors: 小康
 */
const { Blog } = require('../db/model/index')

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

module.exports = {
  createBlog
}
