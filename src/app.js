/**
 * @description:
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-15 17:43:51
 * @LastEditTime: 2020-12-17 14:16:00
 * @LastEditors: 小康
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./config/db')
const index = require('./routes/index')
const userViewRouter = require('./routes/view/users')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

const { isProd } = require('./utils/env')
// error handler
let onErrorConfig = {}
if (isProd) {
  onErrorConfig.redirect = '/error'
}
onerror(app, onErrorConfig)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)
// session配置（加密密匙）
app.keys = ['XiaoKang666']
app.use(
  session({
    // cookie的name 默认是 koa.sid
    key: 'weibo.sid',
    // redis key 的前缀 默认是 koa.sess
    prefix: 'weibo:sess:',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)
// routes
app.use(index.routes(), index.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())

app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
