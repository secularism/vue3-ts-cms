// 定义传入的account 参数类型
export interface IAccount {
  name: string
  password: string
}
// 定义请求返回的类型 其中data是泛型
export interface IDataType<T = any> {
  code: number
  data: T
}
// 定义登录请求后 结果的类型
export interface ILoginResult {
  id: number
  name: string
  token: string
}
