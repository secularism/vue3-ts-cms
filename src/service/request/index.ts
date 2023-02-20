// 用于封装axios
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ISXRequestConfig, ISXRequestInterceptors } from './type'

import { ElLoading } from 'element-plus/lib'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
// 设置默认需要Loading加载
const DEFAULT_LOADING = true

// 封装成一个类，在使用时 创建的是每一个实例，这样可以根据不同需求创建不同的实例
class SXRequest {
  /**
   * 这里是初始化参数
   * 1.instance: 实例参数，用于保存创建的实例，使用axios.create()进行创建
   * 2.interceptors: 拦截器参数，用于保存实例传入进来的自定义拦截器，便于每个实例有不同的拦截器
   * 3.loading: 该参数是用来保存Element_plus中ElLoading.service()的，便于在创建ElLoading之后，调用其close()方法可以关闭loading动画
   * 4.showLoading: 加载动画的参数: 用于保存每个实例是否需要加载动画，不传默认是DEFAULT_LOADING
   */
  instance: AxiosInstance
  interceptors?: ISXRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  // 使用构造器使得每次创建的类都有一个axios实例，便于不用的请求配置
  constructor(config: ISXRequestConfig) {
    // 初始化参数
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 如果实例没有传入showLoading参数则会返回默认参数DEFAULT_LOADING
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用?.获取每个实例自己发送过来的自定义拦截
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
        // 如果需要展示的时候，则在此创建loading动画
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
          // 这里可以通过调用上面的loading参数关闭动画
          this.loading?.close()
        }, 1000)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        return err
      }
    )
  }

  //封装请求函数
  request<T>(config: ISXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求的拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }
      // 2.如果每个实例下面的request请求方法不需要loading方法，则在此关闭它，其他方法类似
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 因为上面将showLoading关闭了，这样如果request请求没有重新设置，那么所有的showLoading都会被关闭，因此这里需要将showLoading重新设置为默认值
          this.showLoading = DEFAULT_LOADING
          // 3.返回这个res
          resolve(res)
        })
        .catch((err) => {
          // 同上
          this.showLoading = DEFAULT_LOADING
          console.log(err)
          // 3.返回err
          reject(err)
        })
    })
  }

  get<T>(config: ISXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: ISXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: ISXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: ISXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default SXRequest
