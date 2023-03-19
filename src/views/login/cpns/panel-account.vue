<template>
  <div>
    <!-- el-form 使用rules绑定规则，使用ref绑定变量，可以查询到该表单校验之后的结果 -->
    <el-form :model="account" :rules="rules" ref="FormRef">
      <!-- prop属性代表rules规则中所对应的是哪个el-form-item -->
      <el-form-item label="账户" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'

import localStorage from '@/utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({
      // 判断本地存储是否有值，没有的话默认为''
      name: localStorage.getCache('name') ?? '',
      password: localStorage.getCache('password') ?? ''
    })
    // 定义变量存储表单组件
    const FormRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    // 子组件的方法, 需要传入一个参数IsRememberPassword是否记住密码
    const LoginAction = (IsRememberPassword: boolean) => {
      // 通过表单组件可以知道校验是否成功
      FormRef.value?.validate((valid) => {
        // 如果验证成功
        if (valid) {
          // 1.判断是否需要保存密码
          if (IsRememberPassword) {
            localStorage.setCache('name', account.name)
            localStorage.setCache('password', account.password)
          } else {
            localStorage.deleteCache('name')
            localStorage.deleteCache('password')
          }
        }

        // 2.开始登录
        store.dispatch('loginModule/accountLoginAction', { ...account })
      })
    }
    return { account, rules, LoginAction, FormRef }
  }
})
</script>

<style scoped></style>
