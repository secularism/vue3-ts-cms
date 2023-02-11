const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  /**
   * vue.config.js 有多种配置方式
   *  */
  // 1.配置方式一: CLI提供的属性
  outputDir: './dist',
  // 2.配置方式二: 和webpack属性完全一致，最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       // 配置别名
  //       components: '@/components'
  //     }
  //   }
  // },

  // 下面这种方式会覆盖不会合并
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }

  // 3.配置方式三:
  // 链式配置，也是会覆盖 通过set配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
})
