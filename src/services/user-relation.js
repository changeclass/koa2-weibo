/**
 * @description: 用户关系 services
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 15:50:52
 * @LastEditTime: 2020-12-19 15:50:52
 * @LastEditors: 小康
 */
const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {number} followerId 被关注人的ID
 * @description: 获取关注该用户的用户列表
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [{ model: UserRelation, where: { followerId } }]
  })
  // 格式化
  let userList = result.rows.map((row) => row.dataValues)
  userList = formatUser(userList)
  return { count: result.count, userList }
}

module.exports = {
  getUsersByFollower
}
