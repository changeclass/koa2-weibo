/**
 * @author 小康
 * @description user 路由
 */
const router = require('koa-router')()

router.get('/login', async function (ctx, next) {
  await ctx.render('login', {})
})

router.get('/register', async function (ctx, next) {
  await ctx.render('register', {})
})

module.exports = router
