/**
 * @author 小康
 * @description sequelize同步数据库
 */
const seq = require('./seq')

require('./model/index')

// 测试链接
seq
  .authenticate()
  .then(() => {
    console.log('ok')
  })
  .catch(() => {
    console.log('error')
  })

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('同步成功')
  process.exit()
})
