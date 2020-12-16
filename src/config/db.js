/**
 * @description 存储配置
 * @author 小康
 * @website https://xiaokang.me
 */

const REDIS_CONF = {
  prot: 6379,
  host: '127.0.0.1'
}

// 判断线上环境还是线下环境
if (process.env) {
} else {
}

module.exports = { REDIS_CONF }
