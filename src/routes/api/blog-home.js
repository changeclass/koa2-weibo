/**
 * @description: 首页 api 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 16:36:31
 * @LastEditTime: 2020-12-18 16:36:31
 * @LastEditors: 小康
 */

const router = require('koa-router')()
const { genValidator } = require('../../middlewares/validator')
const { create, getHomeBlogList } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
const blogValidate = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/blog')

// 创建微博
router.post(
  '/create',
  loginCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
  }
)
// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex) // 转换 number 类型
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})
module.exports = router
