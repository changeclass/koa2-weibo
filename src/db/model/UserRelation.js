/**
 * @description:用户关注关系
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 15:31:54
 * @LastEditTime: 2020-12-19 15:31:55
 * @LastEditors: 小康
 */

const seq = require('../seq')
const { INTEGER } = require('../type')
const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的ID'
  }
})
module.exports = UserRelation
