/**
 * @description: 微博数据模型单元测试
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 17:20:35
 * @LastEditTime: 2020-12-18 17:20:36
 * @LastEditors: 小康
 */

/**
 * @description: user model test
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 19:41:28
 * @LastEditTime: 2020-12-17 19:41:28
 * @LastEditors: 小康
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性，符合预期', () => {
  // 构建一个内存的Blog实例，但不会提交数据库
  const blog = Blog.build({
    userId: 1,
    content: '微博内容',
    image: '/test.png'
  })
  // 验证各个属性
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('微博内容')
  expect(blog.image).toBe('/test.png')
})
