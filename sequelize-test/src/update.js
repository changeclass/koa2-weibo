const { User } = require('./model')

!(async function () {
  // update 传入两个参数
  // 第一个参数是需要修改的值
  // 第二个参数传入修改的条件
  const updateRes = await User.update(
    {
      nickName: '张三1'
    },
    {
      where: {
        username: 'zhangsan'
      }
    }
  )
  console.log('updateRes', updateRes)
})()
