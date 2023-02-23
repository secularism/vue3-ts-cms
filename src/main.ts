import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import 'normalize.css'
import './assets/css/index.less'

import { registerApp } from './global'

// import './service/axios_demo'
import sxRequest from './service'

const app = createApp(App)

// 注册element-plus组件
app.use(registerApp)
app.use(router)
app.use(store)
// 挂载
app.mount('#app')

interface DatType {
  data: any
  success: boolean
  returnCode: string
}
// sxRequest
//   .request<DatType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求拦截')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独的相应拦截')
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
sxRequest
  .get<DatType>({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
