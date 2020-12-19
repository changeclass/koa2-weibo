/**
 * @description: 微博缓存层
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 14:53:13
 * @LastEditTime: 2020-12-19 14:53:13
 * @LastEditors: 小康
 */

const { get, set } = require('./_redis')

const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square'

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {*} pageIndex
 * @param {*} pageSize
 * @description: 获取广场列表的缓存
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult != null) {
    return cacheResult
  } else {
    // 没有缓存则读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })
    // 设置缓存 过期时间1分钟
    set(key, result, 60)
    // 返回数据
    return result
  }
}

module.exports = {
  getSquareCacheList
}
