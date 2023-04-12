<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view
    ></el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus/lib'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineComponent({
  name: 'App',
  components: { ElConfigProvider },
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style scoped>
.app {
  height: 100%;
}
</style>
