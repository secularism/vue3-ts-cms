<template>
  <div class="menu">
    <page-content PageName="menu" :contentTableConfig="contentTableConfig">
      <template #icon="scope">
        <el-icon size="20">
          <component :is="$filters.mapIcon(scope.row.icon)"></component>
        </el-icon>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'myMenu',
  components: {
    pageContent
  },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
