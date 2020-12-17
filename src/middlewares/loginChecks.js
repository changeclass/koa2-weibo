/**
 * @description: 登录验证的中间件
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 19:22:14
 * @LastEditTime: 2020-12-17 19:22:15
 * @LastEditors: 小康
 */

const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {Object} ctx
 * @param {Function} next
 * @description: API 登录验证
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {Object} ctx
 * @param {Function} next
 * @description: 页面登录验证
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}
