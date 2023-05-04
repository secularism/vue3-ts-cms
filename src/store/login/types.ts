export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permission: string[]
}
// 定义menu的类型
// 三级item
export type subItem = {
  id: number
  name: string
  parentId: number
  permission: string
  sort: null
  type: number
  url: null
}
// 二级item。其中children是可选
export type item = {
  children?: subItem[]
  id: 2
  name: string
  parentId: number
  sort: number
  type: number
  url: string
}
// 一级
export type menuItems = {
  children: item[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
}

export type userMenus = menuItems[]
