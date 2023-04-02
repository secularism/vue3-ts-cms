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
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRow,
  ElCol
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
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRow,
  ElCol
]
// 全局注册icon组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function globalRegister(app: App) {
  // 全局注册一次
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
