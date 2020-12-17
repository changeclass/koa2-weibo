/**
 * @description: user model test
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 19:41:28
 * @LastEditTime: 2020-12-17 19:41:28
 * @LastEditors: 小康
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
  // 构建一个内存的User实例，但不会提交数据库
  const user = User.build({
    userName: 'zhangsan',
    password: 'p1234',
    nickName: '张三',
    // gender: 1,
    picture: '/xxx.png',
    city: '北京'
  })
  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('p1234')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
})
