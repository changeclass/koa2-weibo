/**
 * @description:
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 14:22:57
 * @LastEditTime: 2020-12-17 14:22:57
 * @LastEditors: 小康
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @description: 获取用户的信息
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询
  const result = await User.findOne({
    // 查询的列
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    // 查询条件
    where: whereOpt
  })
  if (result == null) {
    // 未找到
    return result
  }
  // 格式化
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {String} userName 用户名
 * @param {String} password 用户密码
 * @param {Number} gender 用户性别
 * @param {String} nickName 用户昵称
 * @description: 创建用户
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {string} userName
 * @description: 删除用户
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0
}
module.exports = {
  getUserInfo,
  createUser,
  deleteUser
}
