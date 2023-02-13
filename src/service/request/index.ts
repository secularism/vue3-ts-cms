// 用于封装axios
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ISXRequestConfig, ISXRequestInterceptors } from './type'

import { ElLoading } from 'element-plus/lib'
// import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

// 封装成一个类
class SXRequest {
  // 初始化参数
  instance: AxiosInstance
  interceptors?: ISXRequestInterceptors
  loading?: any
  // 使用构造器使得每次创建的类都有一个axios实例，便于不用的请求配置
  constructor(config: ISXRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
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
        console.log('所有实例请求拦截成功')
        this.loading = ElLoading.service({
          lock: true,
          background: 'rgba(0,0,0,0.2)',
          text: '加载中，请稍后'
        })

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例响应拦截成功')
        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  //封装请求函数
  request(config: ISXRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors?.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default SXRequest
