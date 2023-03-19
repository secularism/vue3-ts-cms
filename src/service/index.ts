import { BASE_TIMEOUT, BASE_URL } from './request/config'
import localCache from '@/utils/cache'
import SXRequest from './request'

const sxRequest = new SXRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 在请求拦截中设置token
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default sxRequest
