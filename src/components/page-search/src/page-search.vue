<template>
  <div>
    <!-- v-bind可以将props全部传入，
    组件可以直接使用v-model传入值进行双向绑定，此时相当于:modelValue 以及事件为update:modelValue -->
    <sx-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <p class="title">高级搜索</p>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary">
            重置<el-icon><Refresh /></el-icon
          ></el-button>
          <el-button type="primary"
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
  setup(props) {
    // 动态双向绑定
    const formOriginData: any = {}
    // 获取配置文件中的filed属性
    const formItems = props.searchFormConfig.formItems.map((item: any) => {
      return item.filed
    })
    // 遍历filed属性动态的生成formOriginData
    formItems.forEach((item: any) => {
      formOriginData[item] = ''
    })
    console.log(formOriginData)
    const formData: any = ref(formOriginData)
    return { formData }
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
