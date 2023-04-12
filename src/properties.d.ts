export {} // 必须加上这个 否则会覆盖原来的
// 为$filters声明类型
declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
