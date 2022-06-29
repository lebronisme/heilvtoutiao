// 获取所有的频道
import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: '/user/channels'
  })
}
// 获取文章列表
// eslint-disable-next-line camelcase
export const getArtList = ({ channel_id, timestamp }) => {
  return request({
    url: '/articles',
    params: { channel_id, timestamp }
  })
}
// 获取所有的频道列表
export const getAllChannels = () => {
  return request({
    url: '/channels'
  })
}
