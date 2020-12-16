/**
 * @description 存储配置
 * @author 小康
 * @website https://xiaokang.me
 */

let REDIS_CONF = {
  prot: 6379,
  host: '127.0.0.1'
}
let MYSQL_CONF = {
  host: 'localhost',
  dialect: 'mysql',
  user: 'root',
  password: 'root',
  prot: '3306',
  database: 'koa2_weibo'
}
// 判断线上环境还是线下环境
if (process.env === 'dev') {
  REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1'
  }
  MYSQL_CONF = {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    password: 'root',
    prot: '3306',
    database: 'koa2_weibo'
  }
} else {
  REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1'
  }
  MYSQL_CONF = {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    password: 'root',
    prot: '3306',
    database: 'koa2_weibo'
  }
}

module.exports = { REDIS_CONF, MYSQL_CONF }
