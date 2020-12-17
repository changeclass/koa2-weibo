const router = require('koa-router')()

const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')
router.prefix('/users')

const util = require('util')
const verify = util.promisify(jwt.verify)

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 用户登录
router.post('/login', async function (ctx, next) {
  const { userName, password } = ctx.request.body
  let userInfo
  if (userName === 'zhangsan' && password == '123') {
    // 登录成功
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1
    }
  }
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }
  if (!userInfo) {
    ctx.body = {
      errno: -1,
      msg: '登录失败'
    }
    return
  }

  ctx.body = {
    errno: 1,
    data: token
  }
})
// 获取用户信息
router.get('/getUserInfo', async function (ctx, next) {
  const token = ctx.header.authorization
  // 也可以获得session解密后的信息
  console.log(ctx.state)
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (ex) {
    ctx.body = {
      errno: 0,
      msg: 'verify token failed'
    }
  }
})
module.exports = router
