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
    >
      <template #status="scope">
        <!-- 使用scope.row来获取子组件每一行的数据，根据数据来动态决定需要展示什么标签 -->
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      handleResetClick
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
