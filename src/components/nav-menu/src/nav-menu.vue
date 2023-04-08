<template>
  <div class="nav-menu">
    <!-- 图标和标题 -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="collapse" class="title">Vue3+TS</span>
    </div>
    <!-- menu -->
    <el-menu
      :default-active="defaultActive"
      background-color="#0c2135"
      text-color="#b7bdc3"
      :collapse="!collapse"
      active-text-color="#0a60bd"
      class="el-menu-vertical"
    >
      <template v-for="(itemMenu, ix) in userMenus" :key="itemMenu.id">
        <template v-if="itemMenu.type === 1">
          <!-- 第一级menu -->
          <el-sub-menu :index="itemMenu.id + ''">
            <template #title>
              <el-icon>
                <component :is="iconName[ix]"></component>
              </el-icon>
              <span>{{ itemMenu.name }}</span>
            </template>

            <template v-for="item in itemMenu.children" :key="item.id">
              <template v-if="item.type === 2">
                <!-- 第二级 -->
                <el-menu-item
                  :index="item.id + ''"
                  @click="handleTurnRouter(item)"
                >
                  <span>{{ item.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { userMenus } from '@/store/login/types'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { pathToMenu } from '@/utils/map-menu'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 计算属性中传入泛型，可以使得到的userMenus为userMenus类型
    const userMenus = computed<userMenus>(
      () => store.state.loginModule.userMenus
    )
    const handleTurnRouter = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    // 定义icon的名字（因为element-plus版本的变更，不能使用i标签来展示icon，且icon的名字均有了改变）
    const iconName = ref()
    // 定义正则表达式
    const re = /-(\w)/g
    // 获取一级菜单中的icon名称，并将其做驼峰处理返回
    iconName.value = store.state.loginModule.userMenus.map((item: any) => {
      return item.icon.substring(8).replace(re, function ($0: any, $1: any) {
        return $1.toUpperCase()
      })
    })
    const currentPath = route.path
    const findMenu = pathToMenu(userMenus.value, currentPath)
    const defaultActive = ref(findMenu.id + '')
    return { userMenus, iconName, handleTurnRouter, defaultActive }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
