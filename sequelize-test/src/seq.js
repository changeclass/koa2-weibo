const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

// 连接池
// conf.pool = {
//   max: 5,
//   min: 0,
//   idle: 10000
// }
// 数据库名、账户名、密码
const seq = new Sequelize('koa2_weibo', 'root', 'root', conf)

module.exports = seq
