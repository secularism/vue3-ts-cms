import { App } from 'vue'

import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/base.css'

import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElCarousel,
  ElCarouselItem
} from 'element-plus/lib'

const components = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElCarousel,
  ElCarouselItem
]

export function globalRegister(app: App) {
  // 全局注册一次
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
