type IFormType = 'input' | 'select' | 'password' | 'datepicker'

export interface IFormItem {
  // 添加一个属性，以便渲染的时候能够通过该属性使用v-model来绑定值
  filed: string
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
