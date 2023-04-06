<template>
  <div>
    <h2>Not Found</h2>
    <el-button @click="change">change</el-button>
    <p>{{ x }}</p>
    <p>{{ y }} ---</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const x = ref({
      name: '...'
    })
    const y = ref({ ...x.value })
    console.log(x, y)
    const change = () => {
      x.value.name = 'hhhh'
      console.log(y)
    }
    return { x, y, change }
  }
})
</script>

<style scoped></style>
