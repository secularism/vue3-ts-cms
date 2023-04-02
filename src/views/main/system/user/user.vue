<template>
  <div class="user">
    <!-- v-bind可以将props全部传入 -->
    <sx-form v-bind="searchFormConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sxForm from '@/base-ui/sxForm'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    sxForm
  },
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped></style>
