//axios基础的封装
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 100000
})

//拦截器

// 添加请求拦截器
httpInstance.interceptors.request.use( config => {
  const useStore = useUserStore()
  const token = useStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 在发送请求之前做些什么
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, error => {
  const useStore = useUserStore()
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 统一错误提示
  ElMessage({ type: 'warning', message: error.response.data.msg })
  //401token失效处理
  //1.清除本地用户数据
  //2.跳转到登录页
  if (error.response.status === 401) {
    useStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(error);
});

export default httpInstance

