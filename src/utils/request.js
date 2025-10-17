import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

// const baseURL = 'http://117.72.220.151/litecmsapi/'
const baseURL = 'http://127.0.0.1:8080//'

// 初始化
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    config.headers.setAuthorization(userStore.token)
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截
request.interceptors.response.use(
  (res) => {
    if (res.data.status === 0) {
      return res
    }
    ElMessage.error(res?.data?.message || '服务器繁忙')

    if (res.data?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage.error(err?.response?.message || '服务器繁忙')
    return Promise.reject(err)
  }
)

export default request
export { baseURL }
