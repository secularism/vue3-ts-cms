<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" PageName="goods">
      <!-- 该组件所定制的插槽 -->
      <template #imgUrl="scope">
        <el-image
          style="width: 80px; height: 80px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="0"
          fit="cover"
          preview-teleported
        />
      </template>
      <template #status="scope">
        <!-- 使用scope.row来获取子组件每一行的数据，根据数据来动态决定需要展示什么标签 -->
        <el-button plain :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: { pageContent },
  name: 'goods',
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
