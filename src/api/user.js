import instance from '@/utils/request'
import store from '@/store'
// 获取验证码
export const getSmsCode = (mobile) => {
  return instance({
    url: `sms/codes/${mobile}`
  })
}
// 用户登录
export const login = ({ mobile, code }) => {
  return instance({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
// 获取用户自己信息
export const getUserInfo = () => {
  return instance({
    url: '/user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
