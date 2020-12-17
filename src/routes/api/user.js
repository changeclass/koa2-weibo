/**
 * @description: user api 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 11:35:32
 * @LastEditTime: 2020-12-17 14:07:08
 * @LastEditors: 小康
 */

const router = require('koa-router')()

const { isExist } = require('../../controller/user')

router.prefix('/user')

// 注册路由
router.post('/register', async (ctx, next) => {})
// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})
module.exports = router
