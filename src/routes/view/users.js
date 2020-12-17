/**
 * @author 小康
 * @description user 路由
 */
const router = require('koa-router')()

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {Object} ctx
 * @description: 判断是否登录
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async function (ctx, next) {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async function (ctx, next) {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router
