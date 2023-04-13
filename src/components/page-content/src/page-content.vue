<template>
  <div class="content">
    <sx-table :tableData="tableData" v-bind="contentTableConfig">
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <!-- 对status的这个插槽使用button来展示 -->
      <template #status="scope">
        <!-- 使用scope.row来获取子组件每一行的数据，根据数据来动态决定需要展示什么标签 -->
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <!-- 全局注册的$filters可以直接使用 -->
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <!-- 全局注册的$filters可以直接使用 -->
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <el-button color="#FFBC42" size="small">
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button color="#FDD692" size="small">
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </sx-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import SxTable from '@/base-ui/SxTable'

export default defineComponent({
  components: { SxTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    PageName: {
      type: String,
      required: true
    },
    offset: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    // 将数据的获取放在这个组件中，目的是为了分层的操作能更灵活
    // 获取数据
    const store = useStore()
    store.dispatch('systemModule/getPageListAction', {
      pageName: props.PageName,
      queryInfo: {
        offset: props.offset,
        size: props.size
      }
    })
    // 定义table数据
    const tableData = computed(() =>
      store.getters['systemModule/pageListData'](props.PageName)
    )
    return { tableData }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
