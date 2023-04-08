<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" class="">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- el-table中可以使用插槽，插槽是默认插槽，也是作用域插槽，可以通过scope拿到相应的值 -->
          <template #default="scope">
            <!-- 在el-table中，scope.row是每一行的数据 -->
            <!-- 在el-table插槽中定义一个插槽，可以使得父组件使用SxTable时动态的决定那一列的数据应该使用什么标签来展示
            其中具名插槽的名字由传入进来的数据动态绑定，并且绑定一个row属性，可以使得父组件在使用时通过row拿到该组件中的数据 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tableData: {
      type: Object,
      required: true
    },
    propList: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
