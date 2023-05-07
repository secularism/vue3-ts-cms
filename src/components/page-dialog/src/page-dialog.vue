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
        <el-button type="primary" @click="centerDialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import sxForm from '@/base-ui/sxForm'

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
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)

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
    return { centerDialogVisible, formData }
  }
})
</script>

<style scoped></style>
