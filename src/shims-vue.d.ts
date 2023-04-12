/* eslint-disable */
// 外部模块定义文件
/**
 * 主要是为项目内所有的vue文件做模块声明（ts不识别.vue文件）
 *
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
declare module 'element-plus/dist/locale/zh-cn.mjs'
