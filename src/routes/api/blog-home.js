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
const { create } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
const blogValidate = require('../../validator/blog')
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

module.exports = router
