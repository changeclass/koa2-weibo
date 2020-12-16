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
    type: Sequelize.STRING
  }
})

module.exports = User
