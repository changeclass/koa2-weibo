/**
 * @description: 微博 view 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:20:45
 * @LastEditTime: 2020-12-18 16:20:46
 * @LastEditors: 小康
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    blogData: {
      blogList: []
    },
    userData: {
      userInfo: ctx.session.userInfo,
      fansData: {
        count: 0,
        list: []
      },
      followersData: {
        count: 0,
        list: []
      }
    }
  })
})

module.exports = router
