/**
 * @description: 个人主页 API 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 11:20:02
 * @LastEditTime: 2020-12-19 11:20:02
 * @LastEditors: 小康
 */

const router = require('koa-router')()

const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router
