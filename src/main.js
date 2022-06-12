import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import './assets/fonts/iconfont.css'

Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // 在request拦截器中展示进度条
  // NProgress.start()

  // console.log(config);
  // 为config做处理，根据API文档中所写的要添加一个属性Authorization，属性值就是token
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 最后必须将config返回，固定写法
  return config
})

axios.interceptors.response.use(config => {
  // 响应成功了就隐藏进度条
  // NProgress.done()
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
