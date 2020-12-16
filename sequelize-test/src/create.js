const { log } = require('debug')
const { Blog, User } = require('./model')

!(async function () {
  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三'
  })
  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四'
  })
  console.log(zhangsan.dataValues.id)
  const zsId = zhangsan.dataValues.id
  const lsId = lisi.dataValues.id

  const weibo1 = await Blog.create({
    title: '微博1',
    content: '内容',
    userId: zsId
  })
  const weibo2 = await Blog.create({
    title: '微博2',
    content: '内容',
    userId: zsId
  })
  const weibo3 = await Blog.create({
    title: '微博3',
    content: '内容',
    userId: lsId
  })
  const weibo4 = await Blog.create({
    title: '微博4',
    content: '内容',
    userId: lsId
  })
})()
