/**
 * @description 数据模型入口文件
 * @author 小康
 */

const User = require('./User')
const Blog = require('./Blog')

// 创建外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
