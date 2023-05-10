import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { getPageListData } from '@/service/main/system/system'
// createStore 的类型是规定了state中的类型
const store = createStore<IRootState>({
  state: () => {
    return {
      roleList: [],
      departmentList: []
    }
  },
  modules: { loginModule, systemModule },
  mutations: {
    changeRoleList(state, roleList) {
      state.roleList = roleList
    },
    changeDepartmentList(state, departmentList) {
      state.departmentList = departmentList
    }
  },
  actions: {
    // 获取角色数据和部门数据
    async getAllRoleAndDepartment({ commit }) {
      // 1. 获取全部的数据
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult?.data

      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = departmentResult?.data

      // 2.存储在state中
      commit('changeRoleList', roleList)
      commit('changeDepartmentList', departmentList)
    }
  }
})
// 导出该方法
export function setupLogin() {
  // 使用actions中的方法 用到dispatch
  store.dispatch('loginModule/loadLocalLogin')
  store.dispatch('getAllRoleAndDepartment')
}
// 因为vuex和ts的兼容不好，这里自定义个一个useStore方法 便于类型的传导
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
