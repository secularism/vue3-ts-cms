import { App } from 'vue'

import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/base.css'

import {
  ElButton,
  ElTable,
  ElBacktop,
  ElCarousel,
  ElCarouselItem,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
} from 'element-plus/lib'

const components = [
  ElButton,
  ElTable,
  ElBacktop,
  ElCarousel,
  ElCarouselItem,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
]

export function globalRegister(app: App) {
  // 全局注册一次
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
