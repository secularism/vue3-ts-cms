import { BASE_TIMEOUT, BASE_URL } from './request/config'
import SXRequest from './request'

const sxRequest = new SXRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功拦截')
      return config
    },
    requestInterceptorCatch(err) {
      console.log('请求成功拦截')
      return err
    },
    responseInterceptor(res) {
      console.log('请求成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('请求成功拦截')
      return err
    }
  }
})

export default sxRequest
