/**
 * @description:utils api 路由
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2020-12-18 14:08:00
 * @LastEditTime: 2020-12-18 14:08:03
 * @LastEditors: 小康
 */

const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')
const { loginCheck } = require('../../middlewares/loginChecks')
router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  // 获取文件
  const file = ctx.req.files['file']
  if (!file) {
    return
  }
  // 获取文件信息
  const { size, path, name, type } = file
  ctx.body = await saveFile({ size, filePath: path, name, type })
})

module.exports = router
