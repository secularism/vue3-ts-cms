<template>
  <div class="loginPanel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><user-filled /></el-icon>
            <span>账户登录</span>
          </span>
        </template>
        <!-- 使用ref绑定这个组件对象，可以通过accountRef拿到该组件的方法、数据等 -->
        <panel-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <panel-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="manage_account">
      <el-checkbox v-model="IsRememberPassword" label="记住密码" />
      <el-link href="#" target="_blank">忘记密码</el-link>
    </div>

    <el-button type="primary" class="btn" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

export default defineComponent({
  components: {
    UserFilled,
    Iphone,
    PanelAccount,
    PanelPhone
  },
  setup() {
    // 是否记住密码，默认是true
    const IsRememberPassword = ref(true)
    // 创建一个变量来保存组件，其类型因为是一个对象，所以要用下面这样的写法
    const accountRef = ref<InstanceType<typeof PanelAccount>>()
    // 这里的是父组件的方法，点击登录会调用此方法，但是登录的逻辑不应该在这里写，因为还有手机登录，登录的逻辑应该要放到子组件里面去编写
    // 这里只是为了告诉子组件，已经触发登录这个方法，实际操作和具体逻辑应有子组件去实现
    const handleLogin = () => {
      // 因为accountRef并不一定会有，因此需要用到可选链
      // accountRef是子组件对象，其value值可以拿到组件，LoginAction()是子组件的方法，通过父组件去调用子组件的方法
      accountRef.value?.LoginAction(IsRememberPassword.value)
    }
    return { IsRememberPassword, handleLogin, accountRef }
  }
})
</script>

<style scoped lang="less">
.loginPanel {
  margin-bottom: 120px;
  width: 320px;
  h1 {
    text-align: center;
  }

  .manage_account {
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
  }

  .btn {
    display: flex;
    width: 100%;
    margin-top: 8px;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
