import sxRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'
// 枚举类型
enum LoginAPI {
  AccountLogin = '/login',
  userInfo = '/users/', // 用法 /users/id(1)
  userMenus = '/role/' // 用法 /role/id/menu
}
// 用于登录 -> account {name: xx, password: xx}
export function accountLoginRequest(account: IAccount) {
  return sxRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
// 用于获取用户的信息 -> id 用户的id号
export function requestUserInfoById(id: number) {
  return sxRequest.get<IDataType>({
    url: LoginAPI.userInfo + id,
    showLoading: false
  })
}
// 用于获取当前用户的菜单信息 -> roleId 用户角色(role)的id
export function requestUserMenusByRoleId(roleId: number) {
  return sxRequest.get<IDataType>({
    url: LoginAPI.userMenus + roleId + '/menu',
    showLoading: false
  })
}
