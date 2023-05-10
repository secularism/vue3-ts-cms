<template>
  <div class="content">
    <sx-table
      :tableData="tableData"
      v-bind="contentTableConfig"
      :tableCount="tableCount"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleAddData"
          >新建用户</el-button
        >
      </template>
      <!-- 对status的这个插槽使用button来展示 -->
      <template #createAt="scope">
        <!-- 全局注册的$filters可以直接使用 -->
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <!-- 全局注册的$filters可以直接使用 -->
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <el-button
          :disabled="!isUpdate"
          color="#FFBC42"
          size="small"
          @click="handleUpdateData(scope.row)"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button
          :disabled="!isDelete"
          color="#FDD692"
          size="small"
          @click="handleDeleteData(scope.row)"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>

      <!-- 这里动态的渲染各个组件中所定制的插槽 -->
      <template
        v-for="item in dynamicSlotName"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 绑定row是为了父组件可以通过scope.row拿到所绑定的值 -->
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </sx-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import SxTable from '@/base-ui/SxTable'
import { usePermission } from '@/hooks/usePermission'
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
  emits: ['handleUpdateData', 'handleAddData'],
  setup(props, { emit }) {
    // 将数据的获取放在这个组件中，目的是为了分层的操作能更灵活
    const store = useStore()

    // 0.获取到每个登录用户的权限信息
    const isCreate = usePermission(props.PageName, 'create')
    const isUpdate = usePermission(props.PageName, 'update')
    const isDelete = usePermission(props.PageName, 'delete')
    const isQuery = usePermission(props.PageName, 'query')

    // 1.传递分页中的参数 使用v-model进行双向绑定
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 并且使用watch对pageInfo监听
    watch(pageInfo, () => {
      getPageData()
    })

    // 2.获取数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.PageName,
        queryInfo: {
          // 根据分页中页数和每页需要展示的数量来动态的请求数据
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.定义table数据
    const tableData = computed(() =>
      store.getters['systemModule/pageListData'](props.PageName)
    )

    const tableCount = computed(() =>
      store.getters['systemModule/pageListCount'](props.PageName)
    )

    // 4.动态获取配置文件中的插槽，以及过滤掉不需要的插槽
    const dynamicSlotName: any[] = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'handler') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === undefined) return false
        return true
      }
    )

    // 监听删除/修改/新建 操作
    // 删除操作不需要emit给父组件，因为每个组件的删除逻辑一致
    const handleDeleteData = (item: any) => {
      store.dispatch('systemModule/deletePageDataAction', {
        pageName: props.PageName,
        id: item.id
      })
    }

    const handleAddData = () => {
      emit('handleAddData')
    }

    const handleUpdateData = (item: any) => {
      emit('handleUpdateData', item)
    }

    return {
      isCreate,
      isUpdate,
      isDelete,
      tableData,
      tableCount,
      pageInfo,
      dynamicSlotName,
      getPageData,
      handleAddData,
      handleDeleteData,
      handleUpdateData
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
