type IFormType = 'input' | 'select' | 'password' | 'datepicker'

export interface IFormItem {
  // 表单的类型，是输入框还是选择框
  type: IFormType
  // 表单的label
  label: string
  // 规则
  rules?: any[]
  // 针对select
  options?: any[]
  placeholder?: any
  // 其他的特殊的属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout: any
  itemLayout: any
}
