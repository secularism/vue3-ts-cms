import { userMenus } from '@/store/login/types'
import { RouteRecordRaw } from 'vue-router'

export default function mapMenusToRoutes(userMenus: userMenus) {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  const _recurseGetRoute = (menus: userMenus) => {
    for (const menu of menus) {
      if (menu.type === 1)
        _recurseGetRoute(menu.children as unknown as userMenus)
      else {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
