import { IForm } from '@/base-ui/sxForm/types'

export const dialogFormConfig: IForm = {
  labelWidth: '80px',
  itemStyle: {
    padding: '0px 0px'
  },
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    }
  ],
  isShowTitle: false,
  isShowFooter: false
}
