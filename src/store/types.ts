import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
  age: number
}
// 定义组件模块
export interface IRootWithModule {
  // 登录模块
  loginModule: ILoginState
  // main -> system模块
  systemModule: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
