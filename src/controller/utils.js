/**
 * @description: utils controller
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 14:13:20
 * @LastEditTime: 2020-12-18 14:13:20
 * @LastEditors: 小康
 */
const path = require('path')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const fse = require('fs-extra')
// 文件最大体积 （5m）
const MAX_SIZE = 5 * 1024 * 1024 * 1024
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})
/**
 * @author: 小康
 * @url: https://xiaokang.me
 * @param {string} name 文件名
 * @param {String} type 文件类型
 * @param {String} size 文件大小
 * @param {String} filePath 文件地址
 * @description: 存储文件
 */
async function saveFile({ name, type, size, filePath }) {
  // 如果文件大小超过设定
  if (size > MAX_SIZE) {
    // 删除文件
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
  await fse.move(filePath, distFilePath)
  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
