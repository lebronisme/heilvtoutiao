import request from '@/utils/request'
// 获取文章内容的接口
export const getArtList = (article_id) => {
  return request({
    url: `articles/${article_id}`
  })
}
// 获取关注用户的接口
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/user/followings',
    data: { target }
  })
}
// 获取取关作者的接口
export const unFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/user/followings/${target}`
  })
}
// 收藏文章接口
export const addCollect = (target) => {
  return request({
    url: '/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消收藏文章接口
export const delCollect = (target) => {
  return request({
    url: `/article/collections/${target}`,
    method: 'DELETE'
  })
}
// 对文章点赞
export const giveLike = (target) => {
  return request({
    method: 'POST',
    url: '/article/likings',
    data: {
      target
    }
  })
}
// 取消对文章点赞
export const removeLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/article/likings/${target}`
  })
}
