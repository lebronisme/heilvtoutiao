import request from '@/utils/request'
// 获取联想建议（自动补全）
export const getSuggestList = q => {
  return request({
    url: '/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果\
// page = 1为默认值，不传的话默认就是1
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: '/search',
    params: {
      page, per_page, q
    }
  })
}
