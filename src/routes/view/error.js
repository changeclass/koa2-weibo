/**
 * @author 小康
 * @description error 404路由
 */

const router = require('koa-router')()

router.get('/error', async function () {
  await ctx.render('error')
})

router.get('*', async function (ctx) {
  await ctx.render('404')
})

module.exports = router
