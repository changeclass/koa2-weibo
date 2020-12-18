/**
 * @description: 首页 test
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 17:22:54
 * @LastEditTime: 2020-12-18 17:22:55
 * @LastEditors: 小康
 */
const server = require('../server')
const { COOKIE } = require('../testUserInfo')
test('创建一条微博,应该成功', async () => {
  // 定义测试内容
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'
  // 开始测试
  const res = await server
    .post('/api/blog/create')
    .send({ content, image })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)
})
