import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { registerApp } from './global'

import './service/axios_demo'

const app = createApp(App)

// 注册element-plus组件
app.use(registerApp)
app.use(router)
app.use(store)
// 挂载
app.mount('#app')
