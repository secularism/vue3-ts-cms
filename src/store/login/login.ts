import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'

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
    accountLoginAction({ commit }, payload) {
      console.log('accountLoginAction', payload)
    },
    phoneLoginAction({ commit }, payload) {
      console.log('phoneLoginAction', payload)
    }
  },
  mutations: {}
}

export default loginModule
