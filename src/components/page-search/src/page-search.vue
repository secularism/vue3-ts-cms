<template>
  <div>
    <!-- v-bind可以将props全部传入，
    组件可以直接使用v-model传入值进行双向绑定，此时相当于:modelValue 以及事件为update:modelValue -->
    <sx-form v-bind="searchFormConfig" v-model="formData" ref="formRef">
      <template #header>
        <p class="title">高级搜索</p>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary" @click="handleResetFormData">
            重置<el-icon><Refresh /></el-icon
          ></el-button>
          <el-button type="primary" @click="search"
            >搜索 <el-icon><Search /></el-icon
          ></el-button>
        </div>
      </template>
    </sx-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import sxForm from '@/base-ui/sxForm'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    sxForm
  },
  emits: ['handleResetClick', 'handleQueryClick'],
  setup(props, { emit }) {
    // 动态双向绑定
    const formOriginData: any = {}
    const formItems = props.searchFormConfig?.formItems ?? []
    for (const item of formItems) {
      formOriginData[item.filed] = ''
    }
    const formData: any = ref(formOriginData)
    const formRef = ref<InstanceType<typeof sxForm>>()
    // onMounted(() => {
    //   console.log(formRef.value?.formData)
    //   console.log(formData.value === formRef.value?.formData)
    //   formData.value['realname'] = '111'
    //   console.log(formRef.value?.formData, formRef.value?.modelValue)
    // })

    // 处理重置操作，不能直接写formData.value = formOriginData，因为解构赋值是浅拷贝
    const handleResetFormData = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('handleResetClick')
    }

    const search = () => {
      // console.log(formRef.value?.formData)
      emit('handleQueryClick', formRef.value?.formData)
    }

    return { formData, formRef, search, handleResetFormData }
  }
})
</script>

<style scoped>
.title {
  font-size: 26px;
  font-weight: 400;
}
.handle-btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
