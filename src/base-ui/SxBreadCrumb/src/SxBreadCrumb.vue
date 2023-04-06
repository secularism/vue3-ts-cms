<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item
        v-for="breadCrumb in breadCrumbs"
        :key="breadCrumb.name"
      >
        {{ breadCrumb.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadCrumb } from '../types'

export default defineComponent({
  props: {
    breadCrumbs: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
