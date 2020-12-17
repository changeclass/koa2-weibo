/**
 * @description: user 的控制器
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 14:19:03
 * @LastEditTime: 2020-12-17 14:19:05
 * @LastEditors: 小康
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {String} userName 需要检查的用户名
 * @description: 检查用户名是否存在
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已经存在
    return new SuccessModel(userInfo)
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别 1是男 2是女 3是保密
 * @description: 注册功能
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return ErrorModel(registerUserNameExistInfo)
  }
  // 注册功能
  try {
    createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (e) {
    console.error(e.message, e.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} ctx koa2 ctx
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @description: 登录
 */
async function login(ctx, userName, password) {
  // 登录成功之后，将用户信息放到session中
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}
module.exports = {
  isExist,
  register,
  login
}
