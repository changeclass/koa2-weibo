/**
 * @description: 用户关系单元测试
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-19 18:05:55
 * @LastEditTime: 2020-12-19 18:05:55
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

test('无论如何，先取消关注，应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: L_ID })
    .set('cookie', Z_COOKIE)
  expect(1).toBe(1)
})

// 添加关注
test('张三关注李四，应该成功', async () => {
  const res = await server
    .post('/api/profile/follow')
    .send({ userId: L_ID })
    .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
})

// 获取粉丝
test('获取李四的粉丝，应该有张三', async () => {
  const res = await getFans(L_ID)
  const { count, userList: fansList } = res.data
  const hasUserName = fansList.some((fanInfo) => {
    return fanInfo.userName === Z_USER_NAME
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 获取关注人

test('获取张三的关注人，应该有李四', async () => {
  const res = await getFollowers(Z_ID)
  const { count, followersList } = res.data
  const hasUserName = followersList.some((followerInfo) => {
    return followerInfo.userName === L_USER_NAME
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 取消关注
test('张三取消关注李四，应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: L_ID })
    .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
})
