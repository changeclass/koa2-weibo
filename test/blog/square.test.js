/**
 * @description: 广场test
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 14:14:51
 * @LastEditTime: 2020-12-19 14:14:51
 * @LastEditors: 小康
 */

const server = require('../server')
const { L_COOKIE } = require('../testUserInfo')

test('广场，加载第一页数据应该成功', async () => {
  const res = await server.get(`/api/square/loadMore/0`).set('cookie', L_COOKIE)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
