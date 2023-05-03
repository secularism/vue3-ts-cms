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
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const pageContentRef = ref<InstanceType<typeof PageContent>>()
    const handleQueryClick = (param: any) => {
      pageContentRef.value?.getPageData(param)
    }
    const handleResetClick = () => {
      console.log(123)
    }
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
