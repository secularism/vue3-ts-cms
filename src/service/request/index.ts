// 用于封装axios
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ISXRequestConfig, ISXRequestInterceptors } from './type'

import { ElLoading } from 'element-plus/lib'

const DEFAULT_LOADING = true

// 封装成一个类
class SXRequest {
  // 初始化参数
  instance: AxiosInstance
  interceptors?: ISXRequestInterceptors
  loading?: any
  showLoading: boolean

  // 使用构造器使得每次创建的类都有一个axios实例，便于不用的请求配置
  constructor(config: ISXRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 使用?.获取实例发送过来的拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 这里是为所有的实例添加的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            background: 'rgba(0,0,0,0.2)',
            text: '加载中，请稍后'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  //封装请求函数
  request(config: ISXRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors?.requestInterceptor(config)
    }

    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }

    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        this.showLoading = DEFAULT_LOADING
        console.log(res)
      })
      .catch((err) => {
        this.showLoading = DEFAULT_LOADING
        console.log(err)
      })
  }
}

export default SXRequest
