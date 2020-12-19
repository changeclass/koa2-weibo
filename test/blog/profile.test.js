/**
 * @description: 个人主页test
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 14:14:51
 * @LastEditTime: 2020-12-19 14:14:51
 * @LastEditors: 小康
 */

const server = require('../server')
const { COOKIE, USER_NAME } = require('../testUserInfo')

test('个人主页，加载第一页数据应该成功', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${USER_NAME}/0`)
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
