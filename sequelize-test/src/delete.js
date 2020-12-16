const { User, Blog } = require('./model')

!(async function () {
  // 删除一条博客
  const delBlogRes = await Blog.destroy({
    where: {
      id: 4
    }
  })
  console.log('delBlogRes', delBlogRes)
})()
