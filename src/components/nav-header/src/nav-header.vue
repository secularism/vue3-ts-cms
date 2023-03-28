<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <!-- 动态切换图标 -->
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <span>123</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  // 使用emit发送事件到父组件
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(true)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 将事件名称和参数发送过去
      emit('foldChange', isFold.value)
    }
    return { isFold, handleFoldClick }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
