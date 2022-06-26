import instance from '@/utils/request'

export const getSmsCode = (mobile) => {
  return instance({
    url: `sms/codes/${mobile}`
  })
}
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
