/**
 * @description: 微博 view 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:20:45
 * @LastEditTime: 2020-12-18 16:20:46
 * @LastEditors: 小康
 */
const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
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

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const { userName: curUserName } = ctx.params
  // 获取微博第一页数据
  // controller
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
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
