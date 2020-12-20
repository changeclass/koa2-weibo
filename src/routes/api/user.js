/**
 * @description: user api 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 11:35:32
 * @LastEditTime: 2020-12-17 14:07:08
 * @LastEditors: 小康
 */

const router = require('koa-router')()

const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getFollowers } = require('../../controller/user-relation')
router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})
// 用户登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})
// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  // 测试环境下可以删除自己
  if (isTest) {
    const { userName } = ctx.session.userInfo
    // 删除
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改基本信息
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  }
)

// 修改密码
router.patch(
  '/changePassword',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
  }
)

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

// 获取 at 列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  const result = await getFollowers(userId)
  const { followersList } = result.data
  const list = followersList.map((user) => {
    return `${user.nickName} - ${user.userName}`
  })
  ctx.body = list
})
module.exports = router
