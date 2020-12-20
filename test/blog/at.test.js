/**
 * @description: 微博 @ 关系 test
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-20 15:21:22
 * @LastEditTime: 2020-12-20 15:21:23
 * @LastEditors: 小康
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')

const {
  Z_ID,
  Z_COOKIE,
  Z_USER_NAME,
  L_ID,
  L_COOKIE,
  L_USER_NAME
} = require('../testUserInfo')

let BLOG_ID

test('张三创建一条微博，@李四，应该成功', async () => {
  const content = '单元测试自动创建的微博 @李四 - ' + L_USER_NAME
  const res = await server
    .post('/api/blog/create')
    .send({
      content
    })
    .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)

  // 记录微博 id
  BLOG_ID = res.body.data.id
})

test('获取李四的 @ 列表（第一页），应该有刚刚创建的微博', async () => {
  const res = await server
    .get('/api/atMe/loadMore/0') // 列表时倒叙排列
    .set('cookie', L_COOKIE)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  const blogList = data.blogList
  const isHaveCurBlog = blogList.some((blog) => blog.id === BLOG_ID)
  expect(isHaveCurBlog).toBe(true)
})
