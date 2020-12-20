/**
 * @description 数据模型入口文件
 * @author 小康
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')
// 创建外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
}
