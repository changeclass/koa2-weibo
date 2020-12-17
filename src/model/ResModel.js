/**
 * @description: res的数据模型
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-17 14:44:52
 * @LastEditTime: 2020-12-17 14:44:52
 * @LastEditors: 小康
 */

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @description: 基础模块
 */
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @description: 成功的模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @description: 失败的模型
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
