<template>
  <div class="sx-form">
    <header class="header">
      <slot name="header">高级搜索</slot>
    </header>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <!-- 这里使用v-model来绑定formData中相对应的值，下同 -->
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.filed}`]"
                ></el-input>
              </template>

              <template
                v-else-if="item.type === 'select' && item.options !== undefined"
              >
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.filed}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.filed}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <footer class="footer">
      <slot name="footer">
        <el-button>按钮</el-button>
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    // 每一个form
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // 整个form的宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 每个item的样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    // 根据屏幕大小指定每行多少个
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    /**
     * 使用computed来包裹modelValue 避免修改单向数据流的规则，做法如下
     *  1.父组件中使用v-model绑定数据（该案例中是一个对象数据，对象中的数据都需要被绑定）
     *  2.在子组件props中定义modelValue用于接收父组件传入的数据，因为v-model在组件中使用 绑定的默认变量是modelValue 所发送的事件默认是update:modelValue
     *  3.在emits中注册该事件
     *  4.引入计算属性，使用计算属性重新定义一个变量来存储modelValue-> get方法用于返回该数据，set方法用于发送事件去修改该数据
     **/
    /**缺点: 但是这样的做法存在一定的问题，使用computed对modelValue进行包裹时
     * 其实set方法没有被调用，原因在于子组件修改值时，并不是对formData修改（计算属性中，只有对formData进行修改才会调用set方法）
     * 也即是说使用计算属性包裹的modelValue在子组件中仍然是直接更改了modelValue，formData实则就是modelValue，与之前的做法一样，只不过没有报单项数据流的问题，这种做法是取了巧
     **/
    // const formData = computed({
    //   get() {
    //     return props.modelValue
    //   },
    //   set(newValue) {
    //     console.log('-------', newValue)
    //     emit('update:modelValue', newValue)
    //   }
    // })
    // 只能通过修改formData的值 才会调用set方法
    // formData.value = {
    //   id: '22',
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createTime: ''
    // }
    // 下面的写法 和上面使用计算属性一样，有没有get和set方法没有什么区别
    // const formData: any = computed(() => props.modelValue)

    // 正确做法：使用解构后复制一份赋值给formData，然后使用watch对formData进行深度监听，此时子组件修改值时，formData会被监听到，会发送事件给父组件，父组件来修改props.modelValue，因为formData对props.modelValue是响应式的，当props.modelValue改变时，formData也会改变，继而避免了单向数据流
    // 但是需要注意的是需要写成ref({ ...props.modelValue })，而不是ref(props.modelValue)，因为前者不是共用一块内存地址，改变formData时不会直接改变modelValue的值，而是通过emit发送事件，由父组件去改变modelValue的值，但是后者是共用一块内存地址，改变formData时已经改变了modelValue，所以再发送emit去改变modelValue已经是多此一举了，这样的话，在子组件就已经改掉了这个modelValue，违反了单向数据流
    console.log(props.modelValue)
    const formData = ref({ ...props.modelValue })
    console.log(formData.value === props.modelValue)

    watch(
      formData,
      (newValue) => {
        // 可以打印
        console.log(newValue)
        // 发送事件修改父组件的值
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )

    return { formData }
  }
})
</script>

<style scoped lang="less">
.sx-form {
  padding-top: 22px;
}
</style>
