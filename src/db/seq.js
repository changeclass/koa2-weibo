/**
 * @author 小康
 * @description sequelize存储配置
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF
const conf = {
  host: host,
  dialect: 'mysql'
}

// 单元测试时不打印sql语句
if (isTest) {
  conf.logging = () => {}
}

// 生产环境使用连接池
if (isProd) {
  // 连接池
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

// 数据库名、账户名、密码
const seq = new Sequelize(database, user, password, conf)

module.exports = seq
