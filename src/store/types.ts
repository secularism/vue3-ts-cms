import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}
// 定义组件模块
export interface IRootWithModule {
  loginModule: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
