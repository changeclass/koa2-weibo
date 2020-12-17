/**
 * @description 用户数据模型
 * @author 小康
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../type')
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别 (1男性2女性3保密)'
  },
  picture: {
    type: STRING,
    comment: '图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})
module.exports = User
