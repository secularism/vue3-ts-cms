<template>
  <div>
    <!-- el-form 使用rules绑定规则，使用ref绑定变量，可以查询到该表单校验之后的结果 -->
    <el-form :model="account" :rules="rules" ref="FormRef">
      <!-- prop属性代表rules规则中所对应的是哪个el-form-item -->
      <el-form-item label="账户" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="pwd">
        <el-input v-model="account.pwd" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      pwd: ''
    })
    // 定义变量存储表单组件
    const FormRef = ref<InstanceType<typeof ElForm>>()
    // 子组件的方法
    const LoginAction = () => {
      // 通过表单组件可以知道校验是否成功
      FormRef.value?.validate((valid, fields) => {
        console.log(valid, fields)
      })
    }
    return { account, rules, LoginAction, FormRef }
  }
})
</script>

<style scoped></style>
