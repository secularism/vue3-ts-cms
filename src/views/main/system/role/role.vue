<template>
  <div class="role">
    <!-- 搜索 -->
    <page-search :searchFormConfig="searchFormConfig" />
    <!-- table 数据展示 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      PageName="role"
      :size="20"
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
  name: 'role',
  components: { PageSearch, PageContent },
  setup() {
    return { searchFormConfig, contentTableConfig }
  }
})
</script>

<style scoped></style>
