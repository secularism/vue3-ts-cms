// 定义请求返回的类型 其中data是泛型
export interface IDataType<T = any> {
  code: number
  data: T
}
