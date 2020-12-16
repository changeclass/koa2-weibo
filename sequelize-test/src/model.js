const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建模型

// 数据表的名字时users
const User = seq.define('user', {
  // id 会自动创建并设为主键 自增
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    // 注释
    comment: '昵称'
  }
})

// 创建blog表
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
// 外键关联 第一种方式
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
// 外键关联 第二种方式
User.hasMany(Blog, {
  foreignKey: 'userId'
})
module.exports = { User, Blog }
