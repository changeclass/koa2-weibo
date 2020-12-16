const { Blog, User } = require('./model')

/* 
普通查询
!(async function () {
  // 查询一条数据
  const zhangsan = await User.findOne({
    // TAG 查询特定的列
    attributes: ['userName', 'nickName'],
    // 查询条件
    where: {
      userName: 'zhangsan'
    }
  })
  // console.log(zhangsan.dataValues)
  // TAG 查询一个列表
  const zhangsanBlogList = await Blog.findAll({
    where: {
      userId: 1
    },
    order: [['id', 'desc']]
  })
  console.log(
    'zhangsanBlogList',
    zhangsanBlogList.map((blog) => blog.dataValues)
  )

  // TAG 分页查询
  const blogPageList = await Blog.findAll({
    // 每次查询2条
    limit: 2,
    // 跳过0条
    offset: 0,
    // 倒序
    order: [['id', 'desc']]
  })
  console.log(
    'blogPageList',
    blogPageList.map((blog) => blog.dataValues)
  )
  // TAG 查询总数
  const blogListAndCount = await Blog.findAndCountAll({
    // 每次查询2条
    limit: 2,
    // 跳过0条
    offset: 0,
    // 倒序
    order: [['id', 'desc']]
  })
  console.log(
    'blogListAndCount',
    blogListAndCount.count, // 所有的总数，不考虑分页
    blogListAndCount.rows.map((blog) => blog.dataValues)
  )
})()
*/

/**
 * 连表查询
 */

!(async function () {
  // TAG 链表查询1 通过微博查询发起人
  const blogListWithUser = await Blog.findAndCountAll({
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName'],
        where: {
          userName: 'zhangsan'
        }
      }
    ]
  })
  // console.log(
  //   'blogListWithUser',
  //   blogListWithUser.count,
  //   blogListWithUser.rows.map((blog) => {
  //     const blogVal = blog.dataValues
  //     blogVal.user = blogVal.user.dataValues
  //     return blogVal
  //   })
  // )

  // TAG2 连表查询2 通过用户查询微博
  const userListWithBlog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [{ model: Blog }]
  })
  console.log(
    'userListWithBlog',
    userListWithBlog.count,
    userListWithBlog.rows.map((user) => {
      const userVal = user.dataValues
      userVal.blogs = userVal.blogs.map((blog) => blog.dataValues)
      return userVal
    })
  )
})()
