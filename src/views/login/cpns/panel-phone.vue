<template>
  <div>
    <el-form>
      <el-form-item label="手机号">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="验证码">
        <div class="code">
          <el-input></el-input>
          <el-button type="primary" class="code_btn">验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.code {
  display: flex;
  .code_btn {
    margin-left: 6px;
  }
}
</style>
