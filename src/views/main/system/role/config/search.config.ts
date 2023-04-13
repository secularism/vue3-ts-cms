import { IForm } from '@/base-ui/sxForm/types'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px'
  },
  colLayout: {
    xl: 6, // >1920px 4个
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      filed: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      filed: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      filed: 'intro',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色'
    },
    {
      filed: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
