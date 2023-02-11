import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import 'element-plus/theme-chalk/index.css'

import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
} from 'element-plus/lib/index'

const app = createApp(App)

const components = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
]

// 全局注册一次
for (const cpn of components) {
  app.component(cpn.name, cpn)
}

app.use(router).use(store)
app.mount('#app')
