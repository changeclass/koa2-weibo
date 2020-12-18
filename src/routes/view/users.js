/**
 * @author 小康
 * @description user 路由
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
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
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @description: 设置页面路由
 */
router.get('/setting', loginRedirect, async function (ctx, next) {
  await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router
