import axios from "axios";
import { useUserStore } from '@/stores'
import { ElMessage } from "element-plus";
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 初始化
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截
instance.interceptors.request.use(config => {
  const userStore = useUserStore()
  if(userStore.token){
    config.headers.Authorization = userStore.token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
instance.interceptors.response.use(res => {
  if(res.data.code === 0){
    return res
  }
  ElMessage.error(res?.data?.message || '服务器繁忙')
  return Promise.reject(res.data)
}, err => {
  if(err.response?.status === 401){
    router.push('/login')
  }

  ElMessage.error(err?.response?.message || '服务器繁忙')
  return Promise.reject(err)
})

export default instance
export { baseURL }
