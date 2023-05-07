import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { deletePageData, getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0
  },
  mutations: {
    changeUsersList(state, usersList) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount) {
      state.menuCount = menuCount
    }
  },
  // getters 可以算做state的计算属性
  getters: {
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`]
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`]
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取需要请求的名称
      const pageName = payload.pageName
      // 得到请求路径
      const pageUrl = `/${pageName}/list`
      // 请求和拿到数据
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult?.data
      // 动态拼接成Mutation的请求名字
      const MutationsPageName =
        (pageName as string).slice(0, 1).toUpperCase() +
        (pageName as string).slice(1)

      commit(`change${MutationsPageName}List`, list)
      commit(`change${MutationsPageName}Count`, totalCount)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 获取需要请求的名称和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 1.删除数据
      await deletePageData(pageUrl)

      // 2.重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
