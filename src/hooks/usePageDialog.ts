import { ref } from 'vue'
import PageDialog from '@/components/page-dialog'

type computeFn = () => void

export function usePageDialog(updateFn: computeFn, addFn: computeFn) {
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
  const defaultInfo = ref({})
  const handleAddData = () => {
    defaultInfo.value = {}
    if (pageDialogRef.value) {
      pageDialogRef.value.centerDialogVisible = true
    }
    addFn && addFn()
  }
  const handleUpdateData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageDialogRef.value) {
      pageDialogRef.value.centerDialogVisible = true
    }

    updateFn && updateFn()
  }
  return [pageDialogRef, defaultInfo, handleAddData, handleUpdateData]
}
