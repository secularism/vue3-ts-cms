import axios from 'axios'
// get请求
axios.get('http://httpbin.org/get').then((res) => {
  console.log(res)
})
// get请求 带参数
axios
  .get('http://httpbin.org/get', {
    params: { data: 123 }
  })
  .then((res) => {
    console.log(res)
  })
// post请求 带参数
axios
  .post('http://httpbin.org/post', {
    name: 'zsx'
  })
  .then((res) => {
    console.log('其他', res)
  })
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log('data', res)
})
axios
  .all([
    axios.get('http://httpbin.org/get'),
    axios.post('http://httpbin.org/post', {
      name: 'zsx'
    })
  ])
  .then((res) => {
    console.log(res)
  })

// axios的配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 1000

// 拦截 需要传入两个参数 均为函数（一个成功的，一个失败的）
// 这里是请求时拦截
axios.interceptors.request.use(
  (config) => {
    return config.data
  },
  (err) => {
    console.log(err)
  }
)
// 响应时拦截
axios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    console.log(err)
  }
)
