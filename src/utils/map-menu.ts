import { userMenus, menuItems } from '@/store/login/types'
import { RouteRecordRaw } from 'vue-router'

// 定义了一个firstMenu来保存menu中的第一个变量，为了访问/main时重定向到默认子路由上
let firstMenu: menuItems

export function mapMenusToRoutes(userMenus: userMenus) {
  const routes: RouteRecordRaw[] = []

  // 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context可以拿到该文件下符合要求的所有文件，第二个参数是否是递归查找，最后一个是查找规则，这里是ts文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 定义一个递归函数，加载所有的routes
  const _recurseGetRoute = (menus: userMenus) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        _recurseGetRoute(menu.children as unknown as userMenus)
      } else {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 该函数是将传入的路径转换为相应的menu对象，为了能获取到menu的id 以动态绑定其id
export function pathToMenu(
  userMenus: userMenus,
  currentPath: string
): menuItems {
  // 定义一个变量来存储找到的menu
  let findMenu: menuItems = {} as menuItems
  for (const menu of userMenus) {
    // 如果type为1 则是一级菜单，递归调用函数
    if (menu.type === 1) {
      findMenu = pathToMenu(
        (menu.children ?? []) as unknown as userMenus,
        currentPath
      )
      // 如果findMenu存在 并且不是一个空对象，则已经找到 return
      if (findMenu && JSON.stringify(findMenu) !== '{}') {
        return findMenu as unknown as menuItems
      }
    }
    // 如果不是一级菜单，并且路径能对应得上 则返回这个menu
    else if (menu.type === 2 && menu.url === currentPath) {
      return menu as unknown as menuItems
    }
  }
  return findMenu
}

export { firstMenu }
