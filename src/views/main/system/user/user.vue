<template>
  <div class="user">
    <!-- 搜索 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleQueryClick="handleQueryClick"
      @handleResetClick="handleResetClick"
    />

    <!-- table 数据展示 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      PageName="users"
      ref="pageContentRef"
      @handleAddData="handleAddData"
      @handleUpdateData="handleUpdateData"
    >
      <template #status="scope">
        <!-- 使用scope.row来获取子组件每一行的数据，根据数据来动态决定需要展示什么标签 -->
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>

    <page-dialog
      ref="pageDialogRef"
      :defaultInfo="defaultInfo"
      :dialogFormConfig="dialogFormConfigRef"
      pageName="users"
    ></page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { dialogFormConfig } from './config/dialog.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageDialog } from '@/hooks/usePageDialog'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageDialog
  },
  setup() {
    // 1. 处理更新和添加操作的不同
    // 因为修改用户信息时，和添加不同，修改操作不允许修改密码，且不展示密码框，因此这里要做特殊处理
    // 定义两个函数传入到hooks中，根据点击修改/增加的事件不同，对密码一栏进行隐藏或展示
    const updateFn = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => {
        return item.field === 'password'
      })

      passwordItem!.isHidden = true
    }
    const addFn = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => {
        return item.field === 'password'
      })

      passwordItem!.isHidden = false
    }

    // 2. 动态的为部门和角色表单中的options添加信息
    // 2.1 获取数据
    const store = useStore()

    // 2.2 需要用computed包裹起来，因为请求数据的时候 页面已经渲染结束
    const dialogFormConfigRef = computed(() => {
      const roleList = store.state.roleList
      const departmentList = store.state.departmentList
      const roleItem = dialogFormConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      const departmentItem = dialogFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      roleItem!.options = roleList.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      departmentItem!.options = departmentList.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return dialogFormConfig
    })

    // 获取公共的变量和方法
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageDialogRef, defaultInfo, handleAddData, handleUpdateData] =
      usePageDialog(updateFn, addFn)
    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      dialogFormConfig,
      handleQueryClick,
      handleResetClick,
      pageDialogRef,
      defaultInfo,
      handleAddData,
      handleUpdateData,
      dialogFormConfigRef
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
