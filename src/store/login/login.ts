import { Module } from 'vuex'
import router from '@/router'
// 导入类型
import { ILoginState, userMenus } from './types'
import { IRootState } from '../types'
// 导入网络请求方法
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
// 导入存储cache的方法
import LocalCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menu'
// 定义一个vuex 的 module，module需要传入两个泛型，分别是根类型和该module 的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      token: '',
      userMenus: []
    }
  },
  getters: {},
  actions: {
    // actions 中是异步方法
    // accountLoginAction 用于账户密码登录
    async accountLoginAction({ commit }, payload) {
      // 1.登录请求，获取用户id和token
      const result = await accountLoginRequest(payload)
      const { id, token } = result.data
      // 存入cache中
      LocalCache.setCache('token', token)
      // 将信息保存至state
      commit('changeToken', token)

      // 2.通过用户id获取用户信息
      const infoResult = await requestUserInfoById(id)
      const userInfo = infoResult.data
      LocalCache.setCache('userInfo', userInfo)
      commit('changeUserInfo', userInfo)

      // 3.通过用户的role id 获取用户后台的菜单信息
      const menusResult = await requestUserMenusByRoleId(userInfo.id)
      const userMenus = menusResult.data
      LocalCache.setCache('userMenus', userMenus)
      commit('changeUserMenus', userMenus)

      // 4.跳转首页
      router.push('/main')
    },
    // phoneLoginAction 手机号登录
    phoneLoginAction(payload) {
      console.log('phoneLoginAction', payload)
    },
    // loadLocalLogin 用于从cache中获取信息存储到vuex
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  // 修改state 最好在mutation里面修改
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: userMenus) {
      // 修改state中的userMenus
      state.userMenus = userMenus

      // 通过userMenus 生成动态路由
      const routes = mapMenusToRoutes(userMenus)
      // 将生成的路由添加至router中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  }
}

export default loginModule
