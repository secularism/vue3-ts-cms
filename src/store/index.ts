import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'

// createStore 的类型是规定了state中的类型
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'zsx',
      age: 24,
      height: 213
    }
  },
  modules: { loginModule, systemModule }
})
// 导出该方法
export function setupLogin() {
  // 使用actions中的方法 用到dispatch
  store.dispatch('loginModule/loadLocalLogin')
}
// 因为vuex和ts的兼容不好，这里自定义个一个useStore方法 便于类型的传导
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
