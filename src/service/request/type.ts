import { AxiosResponse, AxiosRequestConfig } from 'axios'
// 定义请求拦截的接口，这样做每一个实例都能自定义自己的拦截事件，并将它传入
export interface ISXRequestInterceptors {
  // 四个拦截均为可选
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
// 使用extends继承AxiosRequestConfig，这是为了扩展AxiosRequestConfig，加上拦截的选项
export interface ISXRequestConfig extends AxiosRequestConfig {
  interceptors?: ISXRequestInterceptors
  showLoading?: boolean
}
