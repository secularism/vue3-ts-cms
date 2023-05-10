<template>
  <el-dialog
    v-model="centerDialogVisible"
    title="新建用户"
    width="30%"
    center
    destroy-on-close
  >
    <sx-form v-bind="dialogFormConfig" v-model="formData"></sx-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmClick"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import sxForm from '@/base-ui/sxForm'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    sxForm
  },
  props: {
    dialogFormConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const store = useStore()
    // 1.监听数据回显
    const formData = ref<any>({})
    // 监听传过来的defaultInfo，如果有值，则是点击了修改按钮，这时候需要将数据回显
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.dialogFormConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 2. 处理确定和取消按钮
    const confirmClick = () => {
      // 2.1 关闭dialog
      centerDialogVisible.value = false
      // 2.2 通过defaultInfo的值来判断是修改操作还是新建操作
      if (Object.keys(props.defaultInfo).length) {
        // 修改操作
        store.dispatch('systemModule/updatePageDataAction', {
          pageName: props.pageName,
          id: props.defaultInfo.id,
          updateInfo: { ...formData.value }
        })
      } else {
        // 添加操作
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          createInfo: { ...formData.value }
        })
      }
    }
    return { centerDialogVisible, formData, confirmClick }
  }
})
</script>

<style scoped></style>
