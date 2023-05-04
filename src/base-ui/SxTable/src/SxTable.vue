<template>
  <div>
    <header class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </header>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class=""
      @selection-change="handleSelectionChange"
      :tree-props="childrenProps.treeProp"
      :row-key="childrenProps.rowKey"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
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
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-if="showFooter"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    tableData: {
      type: Object,
      required: true
    },
    propList: {
      type: Object,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      default: true
    },
    tableCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 监听表格的选择
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    // 监听处理当前页数的改变
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    // 监听当前pageSize的改变
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return { handleSelectionChange, handleCurrentChange, handleSizeChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  display: flex;
  justify-content: right;
}
</style>
