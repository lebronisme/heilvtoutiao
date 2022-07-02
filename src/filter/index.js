import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 全局使用
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// dateformat函数,被导入过滤器中,就是过滤器函数,如果不导入,这个就是普通函数
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
