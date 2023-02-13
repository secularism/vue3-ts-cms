let BASE_URL = ''
const BASE_TIMEOUT = 1000
// 根据环境的不同，修改相应配置
// 开发环境
if (process.env.NODE_ENV == 'development') {
  BASE_URL = 'http://123.207.32.32:8000'
} else if (process.env.NODE_ENV == 'production') {
  // 生成环境
  BASE_URL = 'http://123.207.32.32:8000'
} else {
  // 测试环境
  BASE_URL = 'http://123.207.32.32:8000'
}

export { BASE_TIMEOUT, BASE_URL }
