<template>
  <div>
    <h2>Not Found</h2>
    <el-button @click="btn1">修改1</el-button>
    <el-button @click="btn2">修改2</el-button>
    <el-button @click="btn3">修改3</el-button>
    <p>{{ f_formdata }}</p>
    <p>{{ modelValue }}</p>
    <p>{{ c_formdata }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const OriginData: any = { name: '', age: '', friend: { name: '' } }
    let f_formdata: any = ref({ name: 'xxx', age: 18, friend: { name: 'xxx' } })
    let modelValue: any = f_formdata.value
    let c_formdata: any = ref({ ...modelValue })
    console.log(
      f_formdata.value === modelValue,
      f_formdata.value === c_formdata.value,
      modelValue === c_formdata.value
    )
    console.log(f_formdata.value, modelValue, c_formdata.value)
    const btn1 = () => {
      // modelValue = OriginData
      for (const item in modelValue) {
        modelValue[item] = ''
      }
      console.log(f_formdata.value, modelValue, c_formdata.value)
    }
    const btn2 = () => {
      c_formdata.value.friend.name = 'hhh'
      console.log(f_formdata.value, modelValue, c_formdata.value)
    }
    const btn3 = () => {
      // f_formdata.value = OriginData
      for (const item in f_formdata.value) {
        f_formdata.value[item] = OriginData[item]
      }
      console.log(f_formdata.value, modelValue, c_formdata.value)
    }
    return { btn1, btn2, btn3, f_formdata, modelValue, c_formdata }
  }
})
</script>

<style scoped></style>
