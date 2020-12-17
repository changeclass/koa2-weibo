/**
 * @description: json schema验证中间件
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 16:34:54
 * @LastEditTime: 2020-12-17 16:34:54
 * @LastEditors: 小康
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {function} validateFn 验证函数
 * @description: 生成json schema 验证中间件
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败
      return (ctx.body = new ErrorModel(jsonSchemaFileInfo))
    }
    // 验证成功
    await next()
  }
  return validator
}

module.exports = { genValidator }
