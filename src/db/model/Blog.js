/**
 * @description: 微博数据模型
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:05:16
 * @LastEditTime: 2020-12-18 16:05:17
 * @LastEditors: 小康
 */

const seq = require('../seq')
const { STRING, INTEGER, TEXT } = require('../type')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog
