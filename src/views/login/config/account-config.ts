export const rules = {
  name: [
    {
      required: true,
      message: '请输入账户',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,8}$/,
      message: '用户名必须是3-8个数字和字母',
      trigger: 'blur'
    }
  ],
  pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{6,}$/,
      message: '密码必须是6个数字以上',
      trigger: 'blur'
    }
  ]
}
