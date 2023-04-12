import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
// 导入setupLogin函数
import { setupLogin } from './store'

import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/es/components/icon/style/css'

import { registerApp } from './global'

const app = createApp(App)
// 页面每次刷新都会重新运行代码，运行main.ts
// 但是因为vuex存储的信息都在内存中，刷新页面之后就会消失，所以为了防止vuex中的信息消失，导致刷新后页面空白
// 则在这里调用setupLogin函数，可以让vuex从cache中获取data
setupLogin()
// 注册element-plus组件
app.use(registerApp)

app.use(router)
app.use(store)
// 挂载
app.mount('#app')
