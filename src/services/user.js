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
const { addFollow } = require('./user-relation')
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
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  const data = result.dataValues
  // 自己关注自己
  addFollow(data.id, data.id)
  return data
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

/**
 * 更新用户个人信息
 * @author 小康
 * @date 2020-12-18
 * @param {Object} { newPassword,newNickName,newPicture,newcity }
 * @param {Object} { userName,password }
 * @returns {Boolean} 是否修改成功
 */
async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
  const updateData = {}
  // 拼接修改内容
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }
  // 拼接查询条件
  const whereData = { userName }
  if (password) {
    whereData.password = password
  }
  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}
module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
