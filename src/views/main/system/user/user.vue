<template>
  <div class="user">
    <!-- 搜索 -->
    <page-search :searchFormConfig="searchFormConfig" />

    <!-- table 数据展示 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      PageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    // 展示数据所需要的字段
    return { searchFormConfig, contentTableConfig }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
