import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 全局使用
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
