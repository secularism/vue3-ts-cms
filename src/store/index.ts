import { createStore } from 'vuex'
import { IRootState } from './types'
import loginModule from './login/login'

// createStore 的类型是规定了state中的类型
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'zsx',
      age: 24,
      height: 213
    }
  },
  modules: { loginModule }
})

export default store
