/**
 * @description: 微博艾特用户的关系
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-20 11:10:05
 * @LastEditTime: 2020-12-20 11:10:05
 * @LastEditors: 小康
 */
const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../type')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博 id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读'
  }
})

module.exports = AtRelation
