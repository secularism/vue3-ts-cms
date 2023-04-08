// 定义传入的account 参数类型
export interface IAccount {
  name: string
  password: string
}

// 定义登录请求后 结果的类型
export interface ILoginResult {
  id: number
  name: string
  token: string
}
