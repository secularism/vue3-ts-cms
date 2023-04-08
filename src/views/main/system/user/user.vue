<template>
  <div class="user">
    <!-- 搜索 -->
    <page-search :searchFormConfig="searchFormConfig" />

    <!-- table 数据展示 -->
    <div class="content">
      <sx-table :tableData="tableData" :propList="propList">
        <!-- 对status的这个插槽使用button来展示 -->
        <template #status="scope">
          <!-- 使用scope.row来获取子组件每一行的数据，根据数据来动态决定需要展示什么标签 -->
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <el-button>{{ scope.row.createAt }}</el-button>
        </template>
      </sx-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageSearch from '@/components/page-search'
import SxTable from '@/base-ui/SxTable'
import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    SxTable
  },
  setup() {
    // 定义子组件form中需要绑定的变量
    const store = useStore()
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    // 定义table数据
    const tableData = computed(() => store.state.systemModule.userList)
    // 展示数据所需要的字段
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }
    ]
    return { searchFormConfig, tableData, propList }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
