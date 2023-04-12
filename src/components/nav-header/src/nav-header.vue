<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <!-- 动态切换图标 -->
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <div class="content">
      <sx-bread-crumb :breadCrumbs="breadCrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import SxBreadCrumb, { IBreadCrumb } from '@/base-ui/SxBreadCrumb'
import userInfo from './user-info.vue'
import { pathToBreadCrumb } from '@/utils/map-menu'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  // 使用emit发送事件到父组件
  emits: ['foldChange'],
  components: { SxBreadCrumb, userInfo },
  setup(props, { emit }) {
    const isFold = ref(true)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 将事件名称和参数发送过去
      emit('foldChange', isFold.value)
    }

    // 获得面包屑的数据
    const store = useStore()
    const breadCrumbs = computed<IBreadCrumb[]>(() => {
      const route = useRoute()
      return pathToBreadCrumb(store.state.loginModule.userMenus, route.path)
    })

    return { isFold, breadCrumbs, handleFoldClick }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
