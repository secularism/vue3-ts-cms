import { ref } from 'vue'
import { useStore } from '@/store/index'

export function getAllIconName() {
  const store = useStore()
  // 定义icon的名字（因为element-plus版本的变更，不能使用i标签来展示icon，且icon的名字均有了改变）
  const iconName = ref()
  // 获取一级菜单中的icon名称，并将其做驼峰处理返回
  iconName.value = store.state.loginModule.userMenus.map((item: any) => {
    return iconMapName(item.icon)
  })
  return iconName
}

export function getSingleIconName(iconName: string) {
  // console.log(iconName)
  return iconMapName(iconName)
}

function iconMapName(iconName: string) {
  // 定义正则表达式
  const re = /-(\w)/g
  return iconName?.substring(8).replace(re, function ($0: any, $1: any) {
    return $1.toUpperCase()
  })
}
