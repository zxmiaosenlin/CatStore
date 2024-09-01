//封装所有和用户相关的接口函数
import httpInstance from "@/utils/http"
// data: {
//   account: '',
//   password: ''
// }
export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}