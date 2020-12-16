const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}
// 数据库名、账户名、密码
const seq = new Sequelize('koa2_weibo', 'root', 'root', conf)

module.exports = seq
