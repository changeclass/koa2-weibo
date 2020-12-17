/**
 * @description: user api 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 11:35:32
 * @LastEditTime: 2020-12-17 14:07:08
 * @LastEditors: 小康
 */

const router = require('koa-router')()

const { isExist, register, login } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})
// 用户登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})
module.exports = router
