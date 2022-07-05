import request from '@/utils/request'
// type	是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
// source	是		源id，文章id或评论id
// offset	否		获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
// limit	否		获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量

// 获取评论或评论回复
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: '/comments',
    params: { type, source, offset, limit }
  })
}
// 对文章或者评论进行评论
export const addCommentList = (data) => {
  return request({
    method: 'POST',
    url: '/comments',
    data
  })
}
// 对评论或评论回复点赞
export const addCommentLike = (target) => {
  return request({
    method: 'POST',
    url: '/comment/likings',
    data: { target }
  })
}
// 取消对评论或评论回复点赞
export const delCommentLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/comment/likings/${target}`
  })
}
