import { BASE_TIMEOUT, BASE_URL } from './request/config'
import SXRequest from './request'

const sxRequest = new SXRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
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
